import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { RecipientReferralSheetUploaded } from '../../events/recipient/recipient-referral-sheet-uploaded'

@Command({
  authorize: 'all',
})
export class UpdateRecipientUserReferralSheetUrl {
  public constructor(readonly recipientUserId: UUID, readonly referralSheetUrl: string) {}

  public static async handle(command: UpdateRecipientUserReferralSheetUrl, register: Register): Promise<void> {
    register.events(new RecipientReferralSheetUploaded(command.recipientUserId, command.referralSheetUrl))
  }
}
