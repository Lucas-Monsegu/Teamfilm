import express from "express"
import router from "./routes/routes"
import bodyparser from "body-parser"
import cookie from "cookie-session"
import passport from "./config/passport"
import KeygripAutorotate from "keygrip-autorotate"
import crypto from "crypto"

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
app.use("/api", router)
app.listen(3000, function () {
  console.log("Example app listening on port 3000!")
})
