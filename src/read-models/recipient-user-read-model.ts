import { ReadModel, Projects, Booster } from '@boostercloud/framework-core'
import { UUID, ProjectionResult, ReadModelAction } from '@boostercloud/framework-types'
import { RecipientUser } from '../entities/recipient-user'
import { RecipientUserRole } from '../common/recipient-user-role'
import { UserPending, UserRegistered, UserVerified } from '../config/roles'
import { RelativeReadModel } from './relative-read-model'
import { TypeOfIdentityDocument } from '../common/type-of-identity-document'

@ReadModel({
  authorize: [UserRegistered, UserPending, UserVerified],
})
export class RecipientUserReadModel {
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
    readonly role: RecipientUserRole,
    readonly deleted?: boolean
  ) {}

  public get relatives(): Promise<RelativeReadModel[] | undefined> {
    return Booster.readModel(RelativeReadModel)
      .filter({ id: { in: this.relativesIds ?? [] } })
      .search() as Promise<RelativeReadModel[]>
  }

  @Projects(RecipientUser, 'id')
  public static projectRecipientUser(
    entity: RecipientUser,
    currentRecipientUserReadModel?: RecipientUserReadModel
  ): ProjectionResult<RecipientUserReadModel> {
    if (entity.deleted == true) {
      return ReadModelAction.Delete
    }

    return new RecipientUserReadModel(
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
      entity.role
    )
  }
}
