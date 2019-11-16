import passport from "passport"
import { Router } from "express"
import { checkAuth, noCache, saveReturnTo } from "./middlewares"
const router = Router()

// logout
router.get("/logout", (req, res) => {
  req.logout()
  return res.send("Logged out")
})

// login
router.get("/login",
  saveReturnTo,
  passport.authenticate("discord", {
    scope: ["identify"]
  })
)

// redirect
router.get("/auth/redirect", passport.authenticate("discord"), (req, res) => {
  if (req.session) {
    res.redirect(req.session.returnTo || '/api/auth');
    delete req.session.returnTo;
  }
  else
    res.redirect('/api/auth')
})

// check
router.get("/auth", checkAuth, noCache, (req, res) => {
  const user: any = req.user
  res.send({
    name: user.name,
    avatar: user.avatar
  })
})

export default router