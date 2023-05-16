import { Projects, ReadModel } from '@boostercloud/framework-core'
import { ProjectionResult, UUID } from '@boostercloud/framework-types'
import { ReferralSheet } from '../entities/referral-sheet'

@ReadModel({
  authorize: 'all',
})
export class ReferralSheetReadModel {
  public constructor(
    readonly id: UUID,
    readonly referralSheet: string,
    readonly status: string,
    readonly recipientId: UUID,
    readonly entityId: UUID,
    readonly uploadedAt: number,
    readonly endDate: number
  ) {}

  @Projects(ReferralSheet, 'id')
  public static projectReferralSheet(
    entity: ReferralSheet,
    currentReferralSheet?: ReferralSheetReadModel
  ): ProjectionResult<ReferralSheetReadModel> {
    return new ReferralSheetReadModel(
      entity.id,
      entity.referralSheet,
      entity.status,
      entity.recipientId,
      entity.entityId,
      entity.uploadedAt,
      entity.endDate
    )
  }
}
