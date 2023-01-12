import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class RecipientUserDeleted {
  public constructor(readonly recipientUserId: UUID) {}

  public entityID(): UUID {
    return this.recipientUserId
  }
}
