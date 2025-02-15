import BaseService from '@src/abstractions/BaseService'
import Discord from 'discord.js'
import Guild from '@src/structures/Guild'
import CommandsHandlerLevel1 from '@src/services/handlers/commands/CommandsHandlerLevel1'
import DeleterGuild from '@src/structures/djs/DeleterGuild'

export default class CommandsExecutor extends BaseService {
  public readonly msg: Discord.Message

  constructor(msg: Discord.Message) {
    super()
    this.msg = msg
  }

  async processCommand() {
    if (this.msg.author.bot) return
    if (this.msg.channel.type === 'dm') return

    const guildData = await this.client.db.get('guilds', this.msg.guild!.id)
    const guild = new Guild(this.msg.guild as DeleterGuild, typeof guildData !== 'string' ? guildData : undefined)

    const commandsHandler = new CommandsHandlerLevel1(this.msg, guild)
    return commandsHandler.handle()
  }
}
