import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class RecipientAddedReferralSheet {
  public constructor(readonly recipientId: UUID, readonly referralSheetId: UUID, readonly entityId: UUID) {}

  public entityID(): UUID {
    return this.recipientId
  }
}
