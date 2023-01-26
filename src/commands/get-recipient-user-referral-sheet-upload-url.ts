import { Command } from '@boostercloud/framework-core'
import { Register } from '@boostercloud/framework-types'
import { UserRegistered } from '../common/roles'
import { UploadFileService } from '../services/upload-file-service'

@Command({
  authorize: [UserRegistered],
})
export class GetRecipientUserReferralSheetUploadUrl {
  public constructor(readonly recipientUserId: string) {}

  public static async handle(command: GetRecipientUserReferralSheetUploadUrl, register: Register): Promise<string> {
    return UploadFileService.getUrlToUploadFile(
      GetRecipientUserReferralSheetUploadUrl.getReferralSheetPath(command.recipientUserId)
    )
  }

  private static getReferralSheetPath(recipientUserId: string): string {
    const date = new Date()
    const currentDate = date.toLocaleDateString('es-ES')
    const unixTime = date.valueOf()

    return `referral-sheets/referral_sheet_${recipientUserId}_${currentDate}_${unixTime}`
  }
}
