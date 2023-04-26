import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class EntityLoginSent {
  public constructor(
    readonly entityId: UUID,
    readonly messageId: string,
    readonly email: string,
    readonly sentAt: number
  ) {}

  public entityID(): UUID {
    return this.entityId
  }
}
