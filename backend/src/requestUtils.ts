import { RequestHandler } from "express"

export const CREATED = 201
export const longPollCursorHeader = 'Long-Poll-Cursor'

export const bodyParser: RequestHandler = (req, _res, next) => {
  req.setEncoding('utf8')
  req.body = ''
  req.on('data', data => req.body += data)
  req.on('end', () => next())
}
export const cors: RequestHandler = (_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", `Origin, X-Requested-With, Content-Type, Accept, ${longPollCursorHeader}`)
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  res.header('Cache-Control', 'no-store')
  next()
}

export const createResponse = (items: unknown[]) => ({ items, total: items.length })
