import Pool from "../pg"

class User {
  id: number | null = null
  discordId: string
  name: string
  avatar: string
  constructor(discordId: string, name: string, avatar: string) {
    this.discordId = discordId
    this.name = name
    this.avatar = avatar
  }
  async CreateUserIntoDB(): Promise<User | null> {
    if (this.discordId && this.name && this.avatar) {
      const values = [this.discordId, this.name, this.avatar]
      const text =
        "INSERT INTO main.user(discord_id, name, avatar) VALUES($1, $2, $3) RETURNING *"
      try {
        const res = await Pool.query(text, values)
        return this
      } catch (err) {
        console.error(err.stack)
        return null
      }
    } else {
      console.error("Couldn't insert user into database")
      return null
    }
  }
  static async GetUserById(id: number): Promise<User | null> {
    const text = "SELECT * from main.user WHERE id=$1"
    const values = [id]
    try {
      const res = await Pool.query(text, values)
      const r: any = res.rows[0]
      if (r === undefined) {
        return null
      }
      const user = new User(r.discord_id, r.name, r.avatar)
      user.id = r.id
      return user
    } catch (err) {
      console.error("error in GetUserById", err.stack)
      return null
    }
  }
  static async GetUserByDiscordId(id: string): Promise<User | null> {
    const text = "SELECT * FROM main.user WHERE discord_id=$1"
    const values = [id]
    try {
      const res = await Pool.query(text, values)
      const r: any = res.rows[0]
      if (r === undefined) {
        return null
      }
      const user = new User(r.discord_id, r.name, r.avatar)
      user.id = r.id
      return user
    } catch (err) {
      console.error("error in GetUserByDIscordId", err.stack)
      return null
    }
  }
}
export default User
