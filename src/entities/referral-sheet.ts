import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { ReferralSheetStatus } from '../common/referral-sheet-status'
import { ReferralSheetUploaded } from '../events/referral-sheet/referral-sheet-uploaded'

@Entity
export class ReferralSheet {
  public constructor(
    readonly id: UUID,
    readonly referralSheet: string,
    readonly status: ReferralSheetStatus,
    readonly recipientId: UUID,
    readonly entityId: UUID,
    readonly uploadedAt: number,
    readonly endDate: number
  ) {}

  static referralSheetNotFound = new ReferralSheet('', '', ReferralSheetStatus.PendingValidation, '', '', 0, 0)

  @Reduces(ReferralSheetUploaded)
  public static reduceReferralSheetUploaded(
    event: ReferralSheetUploaded,
    currentReferralSheet?: ReferralSheet
  ): ReferralSheet {
    if (!currentReferralSheet) {
      return new ReferralSheet(
        event.id,
        event.referralSheet,
        event.status,
        event.recipientId,
        event.entityId,
        event.uploadedAt,
        event.endDate
      )
    }
    return currentReferralSheet
  }
}
