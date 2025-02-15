import Discord, { ClientUser } from 'discord.js'
import DeleterClientOptions from '@src/types/deleter/DeleterClientOptions'
import DeleterClientCache from '@src/types/deleter/DeleterClientCache'
import Gatherer from '@src/services/GathererService'
import DatabaseOperator from '@src/services/DatabaseOperator'

class DeleterClient extends Discord.Client {
  public token: string
  public owner: string | undefined
  public cache!: DeleterClientCache
  public db!: DatabaseOperator
  public options!: DeleterClientOptions
  public user!: ClientUser

  constructor(token: string, options?: DeleterClientOptions) {
    super(options)
    this.token = token
    this.owner = options?.owner || 'nobody'
  }

  load() {
    global.client = this

    this.cache = {
      cd: new Discord.Collection<string, any>(),
      commands: Gatherer.loadCommands(),
      events: Gatherer.loadEvents(),
      subCommands: Gatherer.loadSubCommands(),
      props: {
        keywords: Gatherer.loadProps('keywords'),
        phrases: Gatherer.loadProps('phrases')
      }
    }

    this.cache.events.forEach(e => {
      this.on(e.name, e.execute)
    })

    this.db = new DatabaseOperator()
    this.db.connect()

    return this.login(this.token)
  }
}

export default DeleterClient
