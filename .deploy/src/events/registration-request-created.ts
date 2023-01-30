import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class RegistrationRequestCreated {
  public constructor(
    readonly registrationRequestId: UUID,
    readonly recipientUserId: UUID,
    readonly referralSheetPending: boolean,
    readonly referralSheetSocialSecurityDate?: string
  ) {}

  public entityID(): UUID {
    return this.registrationRequestId
  }
}
