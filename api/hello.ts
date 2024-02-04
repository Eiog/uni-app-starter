import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  res.send('Hello World!')
}
