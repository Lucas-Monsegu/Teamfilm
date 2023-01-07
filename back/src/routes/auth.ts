import passport from "passport"
import { Router, Request, Response } from "express"
import { checkAuth, noCache, saveReturnTo } from "./middlewares"
const router = Router()

// logout
router.get("/logout", (req: Request, res: Response) => {
    req.logOut(() => { })
    return res.send("Logged out")
})

// login
router.get("/login",
    saveReturnTo,
    passport.authenticate("discord", {
        scope: ["identify"], keepSessionInfo: true
    })
)

// redirect
router.get("/auth/redirect", (req, res, next) => {
    const ret = req.session.returnTo
    passport.authenticate('discord', { scope: ["identify"], keepSessionInfo: true }, function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        req.logIn(user, function (err) {
            if (req.session) {
                if (!ret) {
                    return res.redirect('/api/auth')
                }
                if (err) {
                    return res.redirect(`http://${ret.split('/')[2]}/nwl`)
                }
                else {
                    const a = res.redirect(ret)
                    delete req.session.returnTo;
                    return a
                }
            } else {
                return res.redirect('/api/auth')
            }
        });
    })(req, res, next);
})

// check
router.get("/auth", checkAuth, noCache, (req, res) => {
    const user: any = req.user
    res.send({
        name: user.name,
        avatar: user.avatar,
        id: user.id
    })
})

export default router
