import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class RelativeDeleted {
  public constructor(readonly relativeId: UUID, readonly recipientId: UUID) {}

  public entityID(): UUID {
    return this.relativeId
  }
}
