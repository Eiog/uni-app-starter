import type { Plugin } from 'vite'
import { readdirSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import express, { Router } from 'express'

interface Options {
  prefix?: string
  dirPath?: string
  mockAll?: boolean
}
export async function VitePluginMock(options?: Options): Promise<Plugin<any>> {
  const { prefix = '/api', dirPath = 'api', mockAll = true } = options || {}
  const localPath = resolve(process.cwd(), dirPath)

  const app = express()
  app.use(express.json())

  const router = Router()
  app.use(router)

  const routesPath = readdirSync(localPath)
    .filter(f => f.endsWith('.ts') && !f.startsWith('_') && statSync(`${localPath}/${f}`).isFile())
  const asyncImport = routesPath.map(async (m) => {
    return {
      path: `/${m.replace('.ts', '')}`,
      fun: await import(`../api/${m}`),
    }
  })
  Promise.all(asyncImport).then((asyncFunc) => {
    asyncFunc.forEach((f) => {
      const keys = Object.keys(f.fun)
      if (keys.includes('default'))
        router.all(f.path, f.fun.default)
    })
  })

  return {
    name: 'vite-plugin-vercel-mock',
    apply: 'serve',
    configureServer: async (server) => {
      server.watcher.add(localPath)
      // mount mock server, `/api` is the base url
      server.middlewares.use(prefix, app)
      if (mockAll) {
        server.middlewares.use(prefix, (req, res) => {
          res.statusCode = 404
          res.end('Moke Path Not Found ! like api/[path]')
        })
      }
    },
  }
}

export default VitePluginMock
