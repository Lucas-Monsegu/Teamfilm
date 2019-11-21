const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

});

client.login('NTE4NTY0MTY1NDA5OTY0MDM3.Xdb0ag.-ONrDa-f7qKgRofVNEx0Nu-sdHg')

async function isWhiteListed(discordId: string): Promise<Boolean> {
  const guild = await client.guilds.get("272379096640520193")

  if (guild === undefined || guild === null) {
    return false
  }
  const user = await client.users.get(discordId);
  if (user === undefined || user === null) {
    return false
  }

  const member = await guild.fetchMember(user)

  return member.roles.some((el: any) => el.id === '647170190341308421')
}

export default isWhiteListed