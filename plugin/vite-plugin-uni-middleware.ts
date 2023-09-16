import { basename, dirname, extname, join, relative, resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import type { ModuleNode, Plugin, ResolvedConfig } from 'vite'
import { normalizePath } from 'vite'
import { parse } from 'jsonc-parser'
import { camelCase, pascalCase, splitByCase } from 'scule'
import fg from 'fast-glob'

export interface Options {
  /**
   * @default "src/middleware"
   */
  middlewareDir: string
  /**
   * @default "src/pages.json"
   */
  pagesJsonPath: string
  /**
   * @default "process.cwd()"
   */
  programRoot: string
}

export interface UserOptions extends Partial<Options> {}

export interface ResolvedOptions extends Options {}

export interface Middleware {
  path: string
  /**
   * found name
   */
  name: string
  /**
   * import name
   */
  value: string
}
export const virtualModuleId = 'virtual:uni-middleware'
export const resolvedVirtualModuleId = `\0${virtualModuleId}`
export async function scanMiddlewares(options: ResolvedOptions) {
  const middlewares: Middleware[] = []
  const files = await fg('**/*.(js|ts)', {
    ignore: ['node_modules', '.git', '**/__*__/*'],
    onlyFiles: true,
    cwd: resolve(options.programRoot, options.middlewareDir),
  })
  files.sort()
  const dir = resolve(options.programRoot, options.middlewareDir)
  for (const file of files) {
    const filePath = join(dir, file)
    const dirNameParts = splitByCase(
      normalizePath(relative(dir, dirname(filePath))),
    )
    let fileName = basename(filePath, extname(filePath))
    if (fileName.toLowerCase() === 'index')
      fileName = basename(dirname(filePath))

    const fileNameParts = splitByCase(fileName)
    const middlewareNameParts: string[] = []
    while (
      dirNameParts.length
      && (dirNameParts[0] || '').toLowerCase()
        !== (fileNameParts[0] || '').toLowerCase()
    )
      middlewareNameParts.push(dirNameParts.shift()!)

    const middlewareName
      = pascalCase(middlewareNameParts) + pascalCase(fileNameParts)

    const value = pascalCase(middlewareName).replace(/["']/g, '')
    const name = camelCase(value)

    if (!middlewares.find(m => m.name === name)) {
      middlewares.push({
        name,
        value,
        path: normalizePath(filePath),
      })
    }
  }
  return middlewares
}

export class Context {
  options: ResolvedOptions
  config!: ResolvedConfig
  middlewares: Middleware[] = []
  pagesJson: {
    middleware?: string[]
    pages?: {
      middleware?: string[]
      path: string
    }[]
  } = {}

  constructor(options: ResolvedOptions) {
    this.options = options
  }

  async virtualModule() {
    this.middlewares = await scanMiddlewares(this.options)

    const pagesJsonRaw = readFileSync(
      resolve(this.config.root, this.options.pagesJsonPath),
      {
        encoding: 'utf-8',
      },
    )
    this.pagesJson = parse(pagesJsonRaw)

    return `${this.middlewareImports.join('\n')}
    export const middlewares = {
      global: [${this.globalMiddlewares.map(v => v.value).join(',')}],
      ${this.pagesMiddlewaresCode.join(',\n')}
    }`
  }

  get pagesMiddlewaresCode() {
    return this.pagesMiddlewares.map(
      v => `"${v.key}": [${v.value.map(v => v.value).join(',')}]`,
    )
  }

  get middlewareImports() {
    return this.middlewares.map(v => `import ${v.value} from "${v.path}";`)
  }

  get globalMiddlewares() {
    return this.findMiddlewaresByMiddlewareNameList(this.pagesJson.middleware)
  }

  get pagesMiddlewares() {
    if (!this.pagesJson.pages)
      return []

    return this.pagesJson.pages.map((page) => {
      const middlewares = this.findMiddlewaresByMiddlewareNameList(
        page.middleware,
      )
      return {
        value: middlewares,
        key: page.path,
      }
    })
  }

  findMiddlewaresByMiddlewareNameList(names: string[] = []) {
    return this.middlewares.filter((m) => {
      return names.find(name => m.name === name)
    })
  }
}

function resolveOptions(userOptions: UserOptions): ResolvedOptions {
  return {
    middlewareDir: 'src/middleware',
    pagesJsonPath: 'src/pages.json',
    programRoot: process.cwd(),
    ...userOptions,
  }
}

export function VitePluginUniMiddleware(userOptions: UserOptions = {}): Plugin {
  const options = resolveOptions(userOptions)
  const ctx = new Context(options)
  return {
    name: 'vite-plugin-uni-middleware',
    configureServer({ watcher, moduleGraph, ws }) {
      const pagesJsonPath = normalizePath(
        resolve(ctx.config.root, options.pagesJsonPath),
      )
      watcher.add(pagesJsonPath)
      const reloadModule = (module: ModuleNode | undefined, path = '*') => {
        if (module) {
          moduleGraph.invalidateModule(module)
          if (ws) {
            ws.send({
              path,
              type: 'full-reload',
            })
          }
        }
      }
      const updateVirtualModule = () => {
        const module = moduleGraph.getModuleById(resolvedVirtualModuleId)
        reloadModule(module)
      }

      watcher.on('change', async (path) => {
        path = normalizePath(path)
        if (pagesJsonPath === path || path.includes(options.middlewareDir))
          updateVirtualModule()
      })
      watcher.on('add', async (path) => {
        path = normalizePath(path)
        if (path.includes(options.middlewareDir))
          updateVirtualModule()
      })
      watcher.on('unlink', async (path) => {
        path = normalizePath(path)
        if (path.includes(options.middlewareDir))
          updateVirtualModule()
      })
    },
    configResolved(_config) {
      ctx.config = _config
    },
    async resolveId(id) {
      if (id === virtualModuleId)
        return resolvedVirtualModuleId
    },
    load(id) {
      if (id === resolvedVirtualModuleId)
        return ctx.virtualModule()
    },
  }
}

export default VitePluginUniMiddleware
