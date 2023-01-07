import { Request, Response, NextFunction } from "express"

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) res.sendStatus(401)
  else next()
}

export const noCache = (req: Request, res: Response, next: NextFunction) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  res.header('Expires', '-1')
  res.header('Pragma', 'no-cache')
  next()
}

export const saveReturnTo = (req: Request, res: Response, next: NextFunction) => {
  console.log('session', req.session)
  if (req.session) {
    req.session.returnTo = req.headers.referer
  }
  console.log(req.session.returnTo, req.session.id)
  next()
}