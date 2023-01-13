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
    readonly password: string,
    readonly dateOfBirth: string,
    readonly address: string,
    readonly phone: number,
    readonly familyMembersCount: number,
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
      entity.password,
      entity.dateOfBirth,
      entity.address,
      entity.phone,
      entity.familyMembersCount
    )
  }
}
