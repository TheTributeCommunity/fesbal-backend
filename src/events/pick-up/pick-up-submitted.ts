import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class PickUpSubmitted {
  public constructor(readonly pickUpId: UUID, readonly items: string[]) {}

  public entityID(): UUID {
    return this.pickUpId
  }
}
