import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { RegistrationRequestSent } from '../events/registration-request-sent'
import { InvalidRegistrationRequestError } from '../common/registration-request-invalid-social-security-date-error'
import { getUserId } from '../common/user-utils'

@Command({
  authorize: 'all',
})
export class SendRegistrationRequest {
  public constructor(
    readonly registrationRequestId: UUID,
    readonly referralSheet?: string,
    readonly socialServiceAppointment?: string
  ) {}

  public static async handle(command: SendRegistrationRequest, register: Register): Promise<void> {
    const recipientId = getUserId(register)
    if (!command.referralSheet && !command.socialServiceAppointment) {
      throw new InvalidRegistrationRequestError(recipientId)
    }

    register.events(
      new RegistrationRequestSent(
        command.registrationRequestId,
        recipientId,
        command.referralSheet || '',
        command.socialServiceAppointment || ''
      )
    )
  }
}
