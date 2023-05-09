import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class PickUpSigned {
  public constructor(readonly pickUpId: UUID, readonly recipientId: UUID, readonly signDate: number) {}

  public entityID(): UUID {
    return this.pickUpId
  }
}
