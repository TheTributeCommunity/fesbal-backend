import { Booster, Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { RegistrationRequestCreated } from '../events/registration-request-created'
import { RecipientUserRegistrationRequested } from '../events/recipient-user-registration-requested'
import { AuthService } from '../services/auth-service'
import { UserRole } from '../common/user-role'
import { RecipientUser } from '../entities/recipient-user'
import { RecipientUserNotFoundError } from '../common/recipient-user-not-found-error'
import { RegistrationRequestInvalidSocialSecurityDateError } from '../common/registration-request-invalid-social-security-date-error'

@Command({
  authorize: 'all',
})
export class CreateRegistrationRequest {
  public constructor(
    readonly registrationRequestId: UUID,
    readonly recipientUserId: UUID,
    readonly referralSheetSocialSecurityDate?: string
  ) {}

  public static async handle(command: CreateRegistrationRequest, register: Register): Promise<void> {
    const referralSheetPending = await CreateRegistrationRequest.isReferralSheetPending(command.recipientUserId)

    if (referralSheetPending && !command.referralSheetSocialSecurityDate) {
      throw new RegistrationRequestInvalidSocialSecurityDateError(command.recipientUserId)
    }

    await AuthService.setRole(register.currentUser?.claims.user_id as string, UserRole.Recipient)
    register.events(new RecipientUserRegistrationRequested(command.recipientUserId))
    register.events(
      new RegistrationRequestCreated(
        command.registrationRequestId,
        command.recipientUserId,
        referralSheetPending,
        command.referralSheetSocialSecurityDate
      )
    )
  }

  private static async isReferralSheetPending(recipientUserId: UUID): Promise<boolean> {
    const currentRecipientUser = await Booster.entity(RecipientUser, recipientUserId)
    if (!currentRecipientUser) {
      throw new RecipientUserNotFoundError(recipientUserId)
    }

    return !currentRecipientUser.referralSheetUrl
  }
}
