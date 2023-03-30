import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { UserPending, UserRegistered, UserVerified } from '../common/roles'
import { RecipientUserReferralSheetUrlUpdated } from '../events/recipient-user-referral-sheet-url-updated'

@Command({
  authorize: [UserRegistered, UserPending, UserVerified],
})
export class UpdateRecipientUserReferralSheetUrl {
  public constructor(readonly recipientUserId: UUID, readonly referralSheetUrl: string) {}

  public static async handle(command: UpdateRecipientUserReferralSheetUrl, register: Register): Promise<void> {
    register.events(new RecipientUserReferralSheetUrlUpdated(command.recipientUserId, command.referralSheetUrl))
  }
}