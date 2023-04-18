import { Projects, ReadModel } from '@boostercloud/framework-core'
import { ProjectionResult, ReadModelAction, UUID } from '@boostercloud/framework-types'
import { TypeOfIdentityDocument } from '../common/type-of-identity-document'
import { Relative } from '../entities/relative'

@ReadModel({
  authorize: 'all',
})
export class RelativeReadModel {
  public constructor(
    readonly id: UUID,
    readonly recipientUserId: UUID,
    readonly firstName: string,
    readonly lastName: string,
    readonly dateOfBirth: string,
    readonly typeOfIdentityDocument: TypeOfIdentityDocument,
    readonly identityDocumentNumber: string
  ) {}
  @Projects(Relative, 'id')
  public static projectRelative(
    entity: Relative,
    currentRelativeReadModel?: RelativeReadModel
  ): ProjectionResult<RelativeReadModel> {
    if (entity.isDeleted) {
      return ReadModelAction.Delete
    }

    return new RelativeReadModel(
      entity.id,
      entity.recipientId,
      entity.firstName,
      entity.lastName,
      entity.dateOfBirth,
      entity.typeOfIdentityDocument,
      entity.identityDocumentNumber
    )
  }
}
