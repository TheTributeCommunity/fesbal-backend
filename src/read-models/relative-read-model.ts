import { Projects, ReadModel } from '@boostercloud/framework-core'
import { ProjectionResult, UUID } from '@boostercloud/framework-types'
import { TypeOfIdentityDocument } from '../common/type-of-identity-document'
import { UserRegistered } from '../common/roles'
import { Relative } from '../entities/relative'

@ReadModel({
  authorize: [UserRegistered],
})
export class RelativeReadModel {
  public constructor(
    public id: UUID,
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
    return new RelativeReadModel(
      entity.id,
      entity.recipientUserId,
      entity.firstName,
      entity.lastName,
      entity.dateOfBirth,
      entity.typeOfIdentityDocument,
      entity.identityDocumentNumber
    )
  }
}
