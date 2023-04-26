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
    readonly items: string[],
    readonly startedAt: string,
    readonly endedAt?: string,
    readonly signed: boolean = false,
    readonly signDate?: string
  ) {}

  @Projects(PickUp, 'id')
  public static projectPickUp(entity: PickUp, currentPickUp?: PickUpReadModel): ProjectionResult<PickUpReadModel> {
    return new PickUpReadModel(
      entity.id,
      entity.receiptId,
      entity.entityId,
      entity.items,
      entity.startedAt.toDateString(),
      entity.endedAt?.toDateString(),
      entity.signed,
      entity.signDate?.toDateString()
    )
  }
}
