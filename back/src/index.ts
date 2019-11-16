import express from "express"
import router from "./routes/routes"
import bodyparser from "body-parser"
import cookie from "cookie-session"
import passport from "./config/passport"

export const app = express()

app.get("/register", async function(req, res) {
  res.json({ name: "Alister" })
})
// post parsing setup
app.use(
  bodyparser.urlencoded({
    extended: true
  })
)
app.use(bodyparser.json())
app.use(
  cookie({
    maxAge: 86400000,
    keys: ["d1a5z6rf4z8a9d1za5d3"]
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use("/api", router)
app.listen(3000, function() {
  console.log("Example app listening on port 3000!")
})
