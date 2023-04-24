import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class EntityDeliveryDone {
  public constructor(readonly entityId: UUID, readonly pickUpId: UUID) {}

  public entityID(): UUID {
    return this.entityId
  }
}
