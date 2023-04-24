import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class EntityNotified {
  public constructor(readonly entityId: UUID, readonly notificationId: UUID) {}

  public entityID(): UUID {
    return this.entityId
  }
}
