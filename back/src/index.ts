import express from "express"
import misc from "./routes/film"
import auth from "./routes/auth"
import bodyparser from "body-parser"
import cookie from "cookie-session"
import passport from "./config/passport"
import KeygripAutorotate from "keygrip-autorotate"

export const app = express()

// post parsing setup
app.use(
  bodyparser.urlencoded({
    extended: true
  })
)
app.use(bodyparser.json())
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
app.listen(3000, function () {
  console.log("Backend listening on port 3000")
})
