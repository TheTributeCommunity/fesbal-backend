import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class SignRequested {
  public constructor(
    readonly pickUpId: UUID,
    readonly receiptId: UUID,
  ) {}

  public entityID(): UUID {
    return /* the associated entity ID */
  }
}
