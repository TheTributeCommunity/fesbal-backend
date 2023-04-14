import { ReadModel, Projects, Booster } from '@boostercloud/framework-core'
import { UUID, ProjectionResult, ReadModelAction } from '@boostercloud/framework-types'
import { Recipient } from '../entities/recipient'
import { RelativeReadModel } from './relative-read-model'
import { TypeOfIdentityDocument } from '../common/type-of-identity-document'

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
    readonly deleted?: boolean
  ) {}

  public get relatives(): Promise<RelativeReadModel[] | undefined> {
    return Booster.readModel(RelativeReadModel)
      .filter({ id: { in: this.relativesIds ?? [] } })
      .search() as Promise<RelativeReadModel[]>
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
      entity.referralSheetUrl
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
      entity.referralSheetUrl
    )
  }
}
