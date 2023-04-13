import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class RecipientUserReferralSheetUrlUpdated {
  public constructor(readonly recipientUserId: UUID, readonly referralSheetUrl: string) {}

  public entityID(): UUID {
    return this.recipientUserId
  }
}
