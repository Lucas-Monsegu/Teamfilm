import { Client, IntentsBitField } from 'discord.js';
const client = new Client({ intents: [IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.GuildMessages] })


console.log(process.env.DISCORD_BOT_TOKEN)
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
try {
  client.login(process.env.DISCORD_BOT_TOKEN)
} catch {
  console.log("Billy failed to connect")
}
async function isWhiteListed(discordId: string): Promise<Boolean> {
  const guild = await client.guilds.fetch(process.env.DISCORD_GUILD_ID)

  if (guild === undefined || guild === null) {
    return false
  }
  const user = await client.users.fetch(discordId)
  if (user === undefined || user === null) {
    return false
  }

  const member = await guild.members.fetch(user)


  console.log(member.roles.cache.some((el: any) => el.id === "647170190341308421"))
  return member.roles.cache.some((el: any) => el.id === "647170190341308421")
}

export default isWhiteListed
