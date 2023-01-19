import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { UserPending, UserRegistered, UserVerified } from '../common/roles'
import { RecipientUserReferralSheetUpdated } from '../events/recipient-user-referral-sheet-updated'

@Command({
  authorize: [UserRegistered, UserPending, UserVerified],
})
export class UpdateRecipientUserReferralSheet {
  public constructor(readonly recipientUserId: UUID, readonly referralSheet: string) {}

  public static async handle(command: UpdateRecipientUserReferralSheet, register: Register): Promise<void> {
    register.events(new RecipientUserReferralSheetUpdated(command.recipientUserId, command.referralSheet))
  }
}
