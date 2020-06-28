import express from "express"
import misc from "./routes/film"
import commentRoutes from "./routes/comments"
import auth from "./routes/auth"
import cookie from "cookie-session"
import passport from "./config/passport"
import KeygripAutorotate from "keygrip-autorotate"
import cors from 'cors'

export const app = express()
app.use(cors());
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
<<<<<<< HEAD
app.listen(3010, function () {
    console.log("Backend listening on port 80")
=======
app.listen(3001, function () {
  console.log("Backend listening on port 3001")
>>>>>>> 582ad41d5074eb2311db71bb6c64b5525b7e1605
})
