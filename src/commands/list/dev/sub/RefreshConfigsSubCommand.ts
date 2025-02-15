import BaseSubCommand from '@src/abstractions/BaseSubCommand'
import CommandExecutionResult from '@src/structures/CommandExecutionResult'
import Gatherer from '@src/services/GathererService'
import RefreshConfigsSubCommandConfig from '@src/commands/list/dev/resources/configs/RefreshConfigsSubCommandConfig'

export default class RefreshConfigsSubCommand extends BaseSubCommand {
  constructor() {
    super('@deleter.commands.list.dev.sub.RefreshConfigsSubCommand', new RefreshConfigsSubCommandConfig())
  }

  execute(): CommandExecutionResult {

    Gatherer.loadFiles((file: string, dir: string) => {
      try {
        const path = `${dir}${file}`,
          req = require

        const fileContents = req(path)?.default

        if (fileContents?.isConfig) delete req.cache[req.resolve(path)]
      } catch (e) {} // eslint-disable-line no-empty
    })

    return new CommandExecutionResult('😎').setReact()
  }
}
