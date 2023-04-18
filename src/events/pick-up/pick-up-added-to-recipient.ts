import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class PickUpAddedToRecipient {
  public constructor(readonly pickUpId: UUID, readonly recipientId: UUID) {}

  public entityID(): UUID {
    return this.recipientId
  }
}
