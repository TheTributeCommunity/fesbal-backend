import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { UserRegistered } from '../common/roles'
import { RegistrationRequestCreated } from '../events/registration-request-created'
import { RecipientUserRegistrationRequested } from '../events/recipient-user-registration-requested'

@Command({
  authorize: [UserRegistered],
})
export class CreateRegistrationRequest {
  public constructor(
    readonly registrationRequestId: UUID,
    readonly recipientUserId: UUID,
    readonly referralSheetPending: boolean = false,
    readonly referralSheetSocialSecurityDate?: string
  ) {}

  public static async handle(command: CreateRegistrationRequest, register: Register): Promise<void> {
    register.events(new RecipientUserRegistrationRequested(command.recipientUserId))
    register.events(
      new RegistrationRequestCreated(
        command.registrationRequestId,
        command.recipientUserId,
        command.referralSheetPending,
        command.referralSheetSocialSecurityDate
      )
    )
  }
}
