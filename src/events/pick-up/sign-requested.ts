import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class SignRequested {
  public constructor(readonly receiptId: UUID, readonly pickUpId: UUID) {}

  public entityID(): UUID {
    return this.receiptId
  }
}
