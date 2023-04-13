import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class RecipientEmailUpdated {
  public constructor(readonly recipientId: UUID, readonly email: string) {}

  public entityID(): UUID {
    return this.recipientId
  }
}
