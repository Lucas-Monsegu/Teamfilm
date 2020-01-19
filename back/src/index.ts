import express from "express"
import misc from "./routes/film"
import commentRoutes from "./routes/comments"
import auth from "./routes/auth"
import cookie from "cookie-session"
import passport from "./config/passport"
import KeygripAutorotate from "keygrip-autorotate"

export const app = express()
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(
  cookie({
    name: "rand",
    maxAge: 24 * 60 * 60 * 1000,
    keys: new KeygripAutorotate({
      totalSecrets: 10,
      ttlPerSecret: 24 * 60 * 60 * 1000
    })
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use("/api", misc)
app.use("/api", auth)
app.use("/api", commentRoutes)
app.listen(80, function () {
  console.log("Backend listening on port 80")
})
