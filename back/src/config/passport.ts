import passport from "passport"
import { Strategy as discordStrat } from "passport-discord"
import User from "../models/user"
import whitelist from "./whitelist"

async function connect(profile: discordStrat.Profile, cb: any) {
  if (!whitelist.includes(profile.id)) return cb(null, null)
  const user = await User.GetUserByDiscordId(profile.id)
  if (user) {
    return cb(null, user)
  } else {
    const avatar = !profile.avatar
      ? "/static/avatar.png"
      : `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
    const user = new User(profile.id, profile.username, avatar)
    try {
      const newUser = await user.CreateUserIntoDB()
      return cb(null, newUser)
    } catch { }
  }
}

passport.serializeUser((user: User, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id: number, done) => {
  const user = await User.GetUserById(id)
  done(null, user)
})

passport.use(
  new discordStrat(
    {
      clientID: "645307699902414872",
      clientSecret: "kmsA5_ufU0PrZ442RZTxBv_Ya9SMvMKa",
      callbackURL: "/api/auth/redirect"
    },
    (accessToken, refreshToken, profile, cb) => connect(profile, cb)
  )
)

export default passport
