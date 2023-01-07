import passport from "passport"
import { Strategy as discordStrat } from "passport-discord"
import User from "../models/user"
import whitelist from "./whitelist"
import isWhiteListed from '../misc/discord_whitelist'
import { serialize } from "v8"

async function connect(profile: discordStrat.Profile, cb: any) {
  if (!whitelist.includes(profile.id) && !await isWhiteListed(profile.id)) return cb(null, 'user not whitelisted')
  const user = await User.GetUserByDiscordId(profile.id)
  const avatar = !profile.avatar
    ? "/avatar.png"
    : `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
  if (user) {
    //check updates
    const id = user.id ? user.id : 1
    if (avatar !== user.avatar) {
      User.UpdateUserAvatar(id, avatar)
    }
    if (profile.username !== user.name) {
      User.UpdateUserAvatar(id, profile.username)
    }
    return cb(null, user)
  } else {
    const user = new User(profile.id, profile.username, avatar)
    try {
      const newUser = await user.CreateUserIntoDB()
      return cb(null, newUser)
    } catch { }
  }
}

passport.serializeUser((user: User, done) => {
  return done(null, user.id)
})

passport.deserializeUser(async (id: number, done) => {
  const user = await User.GetUserById(id)
  return done(null, user)
})

passport.use(
  new discordStrat(
    {
      clientID: "645307699902414872",
      clientSecret: "kmsA5_ufU0PrZ442RZTxBv_Ya9SMvMKa",
      callbackURL: "https://teamfilm.up.railway.app/api/auth/redirect"
    },
    (accessToken: any, refreshToken: any, profile: any, cb: any) => connect(profile, cb)
  )
)

export default passport
