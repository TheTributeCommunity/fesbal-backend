import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { ReferralSheetStatus } from '../../common/referral-sheet-status'

@Event
export class ReferralSheetUploaded {
  public constructor(
    readonly id: UUID,
    readonly referralSheet: string,
    readonly status: ReferralSheetStatus,
    readonly recipientId: UUID,
    readonly entityId: UUID,
    readonly uploadedAt: number,
    readonly endDate: number
  ) {}

  public entityID(): UUID {
    return this.id
  }
}
