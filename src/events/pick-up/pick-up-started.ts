import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class PickUpStarted {
  public constructor(
    readonly pickUpId: UUID,
    readonly receiptId: UUID,
    readonly entityId: UUID,
    readonly items: Map<string, string>,
    readonly startDate: Date
  ) {}

  public entityID(): UUID {
    return this.pickUpId
  }
}
