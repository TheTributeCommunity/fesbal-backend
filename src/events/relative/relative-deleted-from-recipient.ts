import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class RelativeDeletedFromRecipient {
  public constructor(readonly recipientId: UUID, readonly relativeId: UUID) {}

  public entityID(): UUID {
    return this.recipientId
  }
}
