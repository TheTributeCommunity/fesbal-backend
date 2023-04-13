import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class EntityCreated {
  public constructor(readonly entityId: UUID, readonly email: string, readonly name: string) {}

  public entityID(): UUID {
    return this.entityId
  }
}
