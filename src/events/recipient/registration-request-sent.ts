import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class RegistrationRequestSent {
  public constructor(
    readonly registrationRequestId: UUID,
    readonly recipientId: UUID,
    readonly referralSheet?: string,
    readonly socialServiceAppointment?: number
  ) {}

  public entityID(): UUID {
    return this.registrationRequestId
  }
}
