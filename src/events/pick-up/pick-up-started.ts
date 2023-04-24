import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class PickUpStarted {
  public constructor(
    readonly pickUpId: UUID,
    readonly receiptId: UUID,
    readonly entityId: UUID,
    readonly startedAt: Date
  ) {}

  public entityID(): UUID {
    return this.pickUpId
  }
}
