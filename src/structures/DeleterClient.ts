import Discord from 'discord.js'
import DeleterClientOptions from '@/types/deleter/DeleterClientOptions'
import DeleterClientCache from '@/types/deleter/DeleterClientCache'
import Gatherer from '@/services/GathererService'
import DatabaseOperator from '@/services/DatabaseOperator'

class DeleterClient extends Discord.Client {
  public token: string
  public owner: string | Array<string>
  // @ts-ignore
  public cache: DeleterClientCache
  // @ts-ignore
  public db: DatabaseOperator

  constructor(token: string, options?: DeleterClientOptions) {
    super(options)
    this.token = token
    this.owner = options?.owner || 'nobody'
  }

  load() {
    // @ts-ignore
    global.client = this

    this.cache = {
      commands: Gatherer.loadCommands(),
      events: Gatherer.loadEvents()
    }

    this.cache.events.forEach(e => {
      this.on(e.name, e.execute.bind(e))
    })

    this.db = new DatabaseOperator()
    this.db.connect()

    return this.login(this.token)
  }
}

export default DeleterClient