import { ReadModel, Projects } from '@boostercloud/framework-core'
import { UUID, ProjectionResult, ReadModelAction } from '@boostercloud/framework-types'
import { RecipientUser } from '../entities/recipient-user'

@ReadModel({
  authorize: 'all', // Specify authorized roles here. Use 'all' to authorize anyone
})
export class RecipientUserReadModel {
  public constructor(
    public id: UUID,
    readonly firstName: string,
    readonly lastName: string,
    readonly dateOfBirth: string,
    readonly phone: number,
    readonly phoneVerified: boolean,
    readonly email?: string,
    readonly password?: string,
    readonly typeOfIdentityDocument?: 'ID' | 'passport',
    readonly identityDocumentNumber?: string,
    readonly familyMembersCount?: number,
    readonly referralSheet?: string,
    readonly applicationStatus?: string,
    readonly deleted?: boolean
  ) {}

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
      entity.phone,
      entity.phoneVerified,
      entity.email,
      entity.password,
      entity.typeOfIdentityDocument,
      entity.identityDocumentNumber,
      entity.familyMembersCount,
      entity.referralSheet,
      entity.applicationStatus
    )
  }
}
