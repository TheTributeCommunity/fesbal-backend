import { ReadModel, Projects, Booster } from '@boostercloud/framework-core'
import { UUID, ProjectionResult, ReadModelAction } from '@boostercloud/framework-types'
import { Recipient } from '../entities/recipient'
import { RelativeReadModel } from './relative-read-model'
import { TypeOfIdentityDocument } from '../common/type-of-identity-document'
import { PickUpReadModel } from './pick-up-read-model'
import { EntityReadModel } from './entity-read-model'
import { NotificationReadModel } from './notification-read-model'

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
    private relativesIds: UUID[],
    readonly referralSheetUrl: string | undefined,
    private entityId: UUID | undefined,
    private pickUpsIds: UUID[],
    private notificationsIds: UUID[],
    readonly pendingSignsIds: UUID[],
    readonly deleted: boolean | false
  ) {}

  public get relatives(): Promise<RelativeReadModel[] | undefined> {
    if (this.relativesIds.length == 0) {
      return Promise.resolve(undefined)
    }

    return Booster.readModel(RelativeReadModel)
      .filter({ id: { in: this.relativesIds ?? [] } })
      .search() as Promise<RelativeReadModel[]>
  }

  public get pickUps(): Promise<PickUpReadModel[] | undefined> {
    if (this.pickUpsIds.length == 0) {
      return Promise.resolve(undefined)
    }

    return Booster.readModel(PickUpReadModel)
      .filter({ id: { in: this.pickUpsIds ?? [] } })
      .search() as Promise<PickUpReadModel[]>
  }

  public get entity(): Promise<EntityReadModel[] | undefined> {
    if (this.entityId == undefined) {
      return Promise.resolve(undefined)
    }

    return Booster.readModel(EntityReadModel)
      .filter({ id: { eq: this.entityId } })
      .search() as Promise<EntityReadModel[]>
  }

  public get notifications(): Promise<NotificationReadModel[] | undefined> {
    if (this.notificationsIds.length == 0) {
      return Promise.resolve(undefined)
    }

    return Booster.readModel(NotificationReadModel)
      .filter({ id: { in: this.notificationsIds ?? [] } })
      .search() as Promise<NotificationReadModel[]>
  }

  @Projects(Recipient, 'id')
  public static projectRecipientUser(entity: Recipient): ProjectionResult<RecipientReadModel> {
    if (entity.isDeleted == true) {
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
      entity.entityId,
      entity.pickUpsIds,
      entity.notificationsIds,
      entity.pendingSignsId,
      entity.isDeleted
    )
  }

  @Projects(Recipient, 'identityDocumentNumber')
  public static projectRecipientUserByDocumentNumber(entity: Recipient): ProjectionResult<RecipientReadModel> {
    if (entity.isDeleted == true) {
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
      entity.entityId,
      entity.pickUpsIds,
      entity.notificationsIds,
      entity.pendingSignsId,
      entity.isDeleted
    )
  }
}
