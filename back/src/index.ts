import * as dotenv from 'dotenv'
dotenv.config()

import express from "express"
import misc from "./routes/film"
import commentRoutes from "./routes/comments"
import auth from "./routes/auth"
import cookie from "cookie-session"
import passport from "./config/passport"
import cors from 'cors'


export const app = express()
app.use(cors());
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(
    cookie({
        name: "rand",
        maxAge: 24 * 60 * 60 * 1000,
        keys: ['a', 'b']
    })
)
app.use(passport.initialize())
app.use(passport.session())
app.use("/api", misc)
app.use("/api", auth)
app.use("/api", commentRoutes)
app.listen(3001, function () {
    console.log("Backend listening on port 3001")
})
