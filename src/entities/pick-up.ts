import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { PickUpStarted } from '../events/pick-up/pick-up-started'

@Entity
export class PickUp {
  public constructor(
    public id: UUID,
    readonly receiptId: UUID,
    readonly entityID: UUID,
    readonly items: Map<string, string>,
    readonly startDate: Date,
    readonly signed: boolean = false,
    readonly signDate?: Date
  ) {}

  @Reduces(PickUpStarted)
  public static reducePickUpSubmitted(event: PickUpStarted): PickUp {
    return new PickUp(event.pickUpId, event.receiptId, event.entityId, event.items, event.startDate)
  }
}
