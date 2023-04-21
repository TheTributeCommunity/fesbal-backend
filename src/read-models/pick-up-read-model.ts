import { Projects, ReadModel } from '@boostercloud/framework-core'
import { PickUp } from '../entities/pick-up'
import { ProjectionResult, UUID } from '@boostercloud/framework-types'

@ReadModel({
  authorize: 'all',
})
export class PickUpReadModel {
  public constructor(
    readonly id: UUID,
    readonly recipientId: UUID,
    readonly entityId: UUID,
    readonly items: string[] = [],
    readonly startedAt: Date,
    readonly endedAt?: Date,
    readonly signed: boolean = false,
    readonly signDate?: Date
  ) {}

  @Projects(PickUp, 'id')
  public static projectPickUp(entity: PickUp, currentPickUp?: PickUpReadModel): ProjectionResult<PickUpReadModel> {
    return new PickUpReadModel(
      entity.id,
      entity.receiptId,
      entity.entityId,
      entity.items,
      entity.startedAt,
      entity.endedAt,
      entity.signed,
      entity.signDate
    )
  }
}
