import passport from "passport"
import { Router, Request, Response, NextFunction } from "express"
const router = Router()

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) res.status(401).send("You are not authenticated")
  else next()
}

router.get("/test", authMiddleware, (req, res) => {
  res.send("test: ")
})

// logout
router.get("/auth/logout", (req, res) => {
  req.logout()
  return res.send("Logged out")
})

// discord
router.get(
  "/auth",
  passport.authenticate("discord", {
    scope: ["identify"]
  })
)

router.get("/auth/redirect", passport.authenticate("discord"), (req, res) => {
  res.redirect("/api/test")
})

export default router
