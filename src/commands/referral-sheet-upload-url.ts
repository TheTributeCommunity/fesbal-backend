import { Booster, Command } from '@boostercloud/framework-core'
import { Register } from '@boostercloud/framework-types'
import { FileHandler } from '@boostercloud/rocket-file-uploads-core'
import { RocketFilesConfigurationDefault } from '../common/config-constants'
import { getUserId } from '../common/user-utils'

export class PresignedPostResponse {
  public constructor(readonly url: string, readonly fields: { [key: string]: string }) {}
}

@Command({
  authorize: 'all',
  // TODO: add validations before: [],
})
export class ReferralSheetUploadUrl {
  public constructor(readonly filename: string) {}

  public static async handle(command: ReferralSheetUploadUrl, register: Register): Promise<PresignedPostResponse> {
    const boosterConfig = Booster.config
    const fileHandler = new FileHandler(boosterConfig, RocketFilesConfigurationDefault.storageName)
    const timestamp = new Date().getTime()

    return (await fileHandler.presignedPut(
      RocketFilesConfigurationDefault.directories[0],
      `${getUserId(register)}/${timestamp}-${command.filename}`
    )) as Promise<PresignedPostResponse>
  }
}