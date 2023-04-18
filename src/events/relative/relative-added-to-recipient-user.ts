import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class RelativeAddedToRecipientUser {
  public constructor(readonly recipientUserId: UUID, readonly relativeId: UUID) {}

  public entityID(): UUID {
    return this.recipientUserId
  }
}
