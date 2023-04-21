import { ReadModel, Projects, Booster } from '@boostercloud/framework-core'
import { UUID, ProjectionResult, ReadModelAction } from '@boostercloud/framework-types'
import { Recipient } from '../entities/recipient'
import { RelativeReadModel } from './relative-read-model'
import { TypeOfIdentityDocument } from '../common/type-of-identity-document'
import { Entity } from '../entities/entity'
import { PickUpReadModel } from './pick-up-read-model'

@ReadModel({
  authorize: 'all',
})
export class RecipientReadModel {
  public constructor(
    public id: UUID,
    readonly firstName: string,
    readonly lastName: string,
    readonly dateOfBirth: string,
    readonly typeOfIdentityDocument: TypeOfIdentityDocument,
    readonly identityDocumentNumber: string,
    readonly phone: string,
    readonly phoneVerified: boolean,
    readonly email: string | undefined,
    readonly relativesIds: Array<UUID> | undefined,
    readonly referralSheetUrl: string | undefined,
    readonly entity: Entity | undefined,
    readonly pickUpsIds: Array<UUID> | undefined,
    readonly lastPickUp: UUID | undefined,
    readonly pendingSign: UUID[] = [],
    readonly deleted: boolean | false
  ) {}

  public get relatives(): Promise<RelativeReadModel[] | undefined> {
    return Booster.readModel(RelativeReadModel)
      .filter({ id: { in: this.relativesIds ?? [] } })
      .search() as Promise<RelativeReadModel[]>
  }

  public get pickUps(): Promise<PickUpReadModel[] | undefined> {
    return Booster.readModel(PickUpReadModel)
      .filter({ id: { in: this.pickUpsIds ?? [] } })
      .search() as Promise<PickUpReadModel[]>
  }

  @Projects(Recipient, 'id')
  public static projectRecipientUser(entity: Recipient): ProjectionResult<RecipientReadModel> {
    if (entity.deleted == true) {
      return ReadModelAction.Delete
    }

    return new RecipientReadModel(
      entity.id,
      entity.firstName,
      entity.lastName,
      entity.dateOfBirth,
      entity.typeOfIdentityDocument,
      entity.identityDocumentNumber,
      entity.phone,
      entity.phoneVerified,
      entity.email,
      entity.relativesIds,
      entity.referralSheetUrl,
      entity.entity,
      entity.pickUps,
      entity.lastPickUp,
      entity.pendingSign,
      entity.deleted
    )
  }

  @Projects(Recipient, 'identityDocumentNumber')
  public static projectRecipientUserByDocumentNumber(entity: Recipient): ProjectionResult<RecipientReadModel> {
    if (entity.deleted == true) {
      return ReadModelAction.Delete
    }

    return new RecipientReadModel(
      entity.id,
      entity.firstName,
      entity.lastName,
      entity.dateOfBirth,
      entity.typeOfIdentityDocument,
      entity.identityDocumentNumber,
      entity.phone,
      entity.phoneVerified,
      entity.email,
      entity.relativesIds,
      entity.referralSheetUrl,
      entity.entity,
      entity.pickUps,
      entity.lastPickUp,
      entity.pendingSign,
      entity.deleted
    )
  }
}
