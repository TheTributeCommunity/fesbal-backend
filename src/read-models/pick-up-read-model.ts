import { Projects, ReadModel } from '@boostercloud/framework-core'
import { PickUp } from '../entities/pick-up'
import { ProjectionResult, UUID } from '@boostercloud/framework-types'

@ReadModel({
  authorize: 'all',
})
export class PickUpReadModel {
  public constructor(
    readonly id: UUID,
    readonly entityId: UUID,
    readonly recipientId: UUID,
    readonly recipientFirstName: string,
    readonly recipientLastName: string,
    readonly recipientIdentityDocumentNumber: string,
    readonly recipientNumberOfRelatives: number,
    readonly startedAt: number,
    readonly submittedAt?: number,
    readonly endedAt?: number,
    readonly signed: boolean = false,
    readonly declined: boolean = false,
    readonly signDate?: number
  ) {}

  @Projects(PickUp, 'id')
  public static projectPickUp(entity: PickUp, currentPickUp?: PickUpReadModel): ProjectionResult<PickUpReadModel> {
    return new PickUpReadModel(
      entity.id,
      entity.entityId,
      entity.recipientId,
      entity.recipientFirstName,
      entity.recipientLastName,
      entity.recipientIdentityDocumentNumber,
      entity.recipientNumberOfRelatives,
      entity.startedAt,
      entity.submittedAt,
      entity.endedAt,
      entity.signed,
      entity.declined,
      entity.signDate
    )
  }
}
