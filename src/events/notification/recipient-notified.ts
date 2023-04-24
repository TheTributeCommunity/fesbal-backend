import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class recipientNotified {
  public constructor(readonly recipientId: UUID, readonly notificationId: UUID) {}

  public entityID(): UUID {
    return this.recipientId
  }
}
