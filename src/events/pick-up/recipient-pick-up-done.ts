import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class RecipientPickUpDone {
  public constructor(readonly recipientId: UUID, readonly pickUpId: UUID) {}

  public entityID(): UUID {
    return this.recipientId
  }
}
