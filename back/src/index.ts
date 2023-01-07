import * as dotenv from 'dotenv'
dotenv.config()

import express from "express"
import misc from "./routes/film"
import commentRoutes from "./routes/comments"
import auth from "./routes/auth"
import session from "express-session"
import passport from "./config/passport"
import cors from 'cors'
import cookieParser from "cookie-parser"

declare module 'express-session' {
    interface SessionData {
        returnTo: string;
    }
}

export const app = express()
app.use(cookieParser());
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(cors({ origin: ['http://localhost:8080', 'https://teamfilm.vercel.app'], credentials: true },));
app.use(session({ secret: process.env.SECRETSESSION, resave: false, saveUninitialized: false, cookie: { maxAge: 6000 * 60 * 24 * 6 * 7, sameSite: 'none', secure: true } }))
app.use(passport.initialize())
app.use(passport.session())
app.use("/api", misc)
app.use("/api", auth)
app.use("/api", commentRoutes)
app.listen(process.env.PORT || 3001, function () {
    console.log("Backend listening on port ", process.env.PORT || 3001)
})
