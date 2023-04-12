import { UUID } from '@boostercloud/framework-types'

export class InvalidRegistrationRequestError extends Error {
  constructor(recipientUserId: UUID) {
    super(
      `The registration request for user ${recipientUserId} is invalid. It must have either a referral sheet or a social service appointment.`
    )
    this.name = 'InvalidRegistrationRequestError'
  }
}
