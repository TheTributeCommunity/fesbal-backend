import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class RecipientUserEmailUpdated {
  public constructor(readonly recipientUserId: UUID, readonly email: string) {}

  public entityID(): UUID {
    return this.recipientUserId
  }
}
