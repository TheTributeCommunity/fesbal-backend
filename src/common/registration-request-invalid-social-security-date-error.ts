import { UUID } from '@boostercloud/framework-types'

export class RegistrationRequestInvalidSocialSecurityDateError extends Error {
  constructor(recipientUserId: UUID) {
    super(
      `The RecipientUser ${recipientUserId} does not have a referral sheet then referralSheetSocialSecurityDate property should be provided.`
    )
    this.name = 'RegistrationRequestInvalidSocialSecurityDateError'
  }
}
