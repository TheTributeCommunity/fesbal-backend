import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { getUserId } from '../../common/user-utils'
import { InvalidRegistrationRequestError } from '../../common/errors/registration-request-invalid-social-security-date-error'
import { RegistrationRequestSent } from '../../events/recipient/registration-request-sent'

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
