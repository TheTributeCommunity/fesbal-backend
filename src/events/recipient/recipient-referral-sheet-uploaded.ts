import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class RecipientReferralSheetUploaded {
  public constructor(
    readonly recipientId: UUID,
    readonly referralSheet: string,
    readonly entityId: UUID,
    readonly uploadedAt: Date,
    readonly endDate: Date
  ) {}

  public entityID(): UUID {
    return this.recipientId
  }
}
