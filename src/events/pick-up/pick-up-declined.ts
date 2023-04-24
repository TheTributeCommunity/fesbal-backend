import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class PickUpDeclined {
  public constructor(
    readonly pickUpId: UUID,
    readonly reason: string,
    readonly explanation: string,
    readonly declinedAt: Date
  ) {}

  public entityID(): UUID {
    return this.pickUpId
  }
}
