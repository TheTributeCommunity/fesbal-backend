import { Booster, Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { FileHandler } from '@boostercloud/rocket-file-uploads-core'
import { RocketFilesConfigurationDefault } from '../../common/config-constants'
import { getUserId } from '../../common/user-utils'
import { RecipientReferralSheetUploaded } from '../../events/recipient/recipient-referral-sheet-uploaded'

export class PresignedPostResponse {
  public constructor(readonly url: string, readonly fields: { [key: string]: string }) {}
}

@Command({
  authorize: 'all',
  // TODO: add validations before: [],
})
export class ReferralSheetUploadUrl {
  public constructor(readonly filename: string, readonly entityId: UUID, readonly endDate: Date) {}

  public static async handle(command: ReferralSheetUploadUrl, register: Register): Promise<PresignedPostResponse> {
    const recipientId = getUserId(register)
    const boosterConfig = Booster.config
    const fileHandler = new FileHandler(boosterConfig, RocketFilesConfigurationDefault.storageName)
    const timestamp = new Date()

    register.events(new RecipientReferralSheetUploaded(recipientId, '', command.entityId, timestamp, command.endDate))

    return (await fileHandler.presignedPut(
      RocketFilesConfigurationDefault.directories[0],
      `${recipientId}/${timestamp.getTime()}-${command.filename}`
    )) as Promise<PresignedPostResponse>
  }
}
