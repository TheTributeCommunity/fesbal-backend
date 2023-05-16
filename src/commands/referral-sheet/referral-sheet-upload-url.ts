import { Booster, Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { FileHandler } from '@boostercloud/rocket-file-uploads-core'
import { RocketFilesConfigurationDefault } from '../../common/config-constants'
import { getUserId } from '../../common/user-utils'
import { RecipientAddedReferralSheet } from '../../events/recipient/recipient-added-referral-sheet'
import { ReferralSheetStatus } from '../../common/referral-sheet-status'
import { ReferralSheetUploaded } from '../../events/referral-sheet/referral-sheet-uploaded'

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

    const referralSheetId = UUID.generate()

    register.events(
      new ReferralSheetUploaded(
        referralSheetId,
        fileKey,
        ReferralSheetStatus.PendingValidation,
        recipientId,
        command.entityId,
        timestamp,
        command.endDate
      ),
      new RecipientAddedReferralSheet(recipientId, referralSheetId, command.entityId)
    )

    return response
  }
}
