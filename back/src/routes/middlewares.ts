import { Request, Response, NextFunction } from "express"

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) res.status(401).send("You are not authenticated")
  else next()
}

export const noCache = (req: Request, res: Response, next: NextFunction) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  res.header('Expires', '-1')
  res.header('Pragma', 'no-cache')
  next()
}

export const saveReturnTo = (req: Request, res: Response, next: NextFunction) => {
  if (req.query.return && req.session) {
    req.session.returnTo = req.query.return
  }
  next()
}