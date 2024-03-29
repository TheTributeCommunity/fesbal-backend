import { Booster, Command } from '@boostercloud/framework-core'
import { Register } from '@boostercloud/framework-types'
import { FileHandler } from '@boostercloud/rocket-file-uploads-core'
import { RocketFilesConfigurationDefault } from '../../common/config-constants'
import { getUserId } from '../../common/user-utils'

@Command({
  authorize: 'all',
})
export class ReferralSheetDownloadUrl {
  public constructor(readonly filename: string) {}

  public static async handle(command: ReferralSheetDownloadUrl, register: Register): Promise<string> {
    const boosterConfig = Booster.config
    const fileHandler = new FileHandler(boosterConfig, RocketFilesConfigurationDefault.storageName)

    return await fileHandler.presignedGet(
      RocketFilesConfigurationDefault.directories[0],
      `${getUserId(register)}/${command.filename}`
    )
  }
}
