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
export class DerivationUploadUrl {
  public constructor() {}

  public static async handle(command: DerivationUploadUrl, register: Register): Promise<PresignedPostResponse> {
    const boosterConfig = Booster.config
    const fileHandler = new FileHandler(boosterConfig, RocketFilesConfigurationDefault.storageName)
    return (await fileHandler.presignedPut(
      RocketFilesConfigurationDefault.directories[0],
      `${getUserId(register)}/derivation.pdf`
    )) as Promise<PresignedPostResponse>
  }
}
