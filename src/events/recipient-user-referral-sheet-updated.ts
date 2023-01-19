import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class RecipientUserReferralSheetUpdated {
  public constructor(readonly recipientUserId: UUID, readonly referralSheet: string) {}

  public entityID(): UUID {
    return this.recipientUserId
  }
}
