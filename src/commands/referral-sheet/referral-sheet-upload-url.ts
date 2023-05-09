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
  public constructor(readonly filename: string, readonly entityId: UUID, readonly endDate: number) {}

  public static async handle(command: ReferralSheetUploadUrl, register: Register): Promise<PresignedPostResponse> {
    const recipientId = getUserId(register)
    const fileHandler = new FileHandler(Booster.config, RocketFilesConfigurationDefault.storageName)
    const timestamp = new Date().getTime()
    const fileKey = `${timestamp}-${command.filename}`

    const response = (await fileHandler.presignedPut(
      RocketFilesConfigurationDefault.directories[0],
      `${recipientId}/${fileKey}`
    )) as Promise<PresignedPostResponse>

    register.events(
      new RecipientReferralSheetUploaded(recipientId, fileKey, command.entityId, timestamp, command.endDate)
    )

    return response
  }
}
