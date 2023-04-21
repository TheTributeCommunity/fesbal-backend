import { Projects, ReadModel } from '@boostercloud/framework-core'
import { ProjectionResult, UUID } from '@boostercloud/framework-types'
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
    readonly isDeleted: boolean,
    readonly typeOfIdentityDocument?: TypeOfIdentityDocument,
    readonly identityDocumentNumber?: string
  ) {}
  @Projects(Relative, 'id')
  public static projectRelative(entity: Relative): ProjectionResult<RelativeReadModel> {
    return new RelativeReadModel(
      entity.id,
      entity.recipientId,
      entity.firstName,
      entity.lastName,
      entity.dateOfBirth,
      entity.isDeleted,
      entity.typeOfIdentityDocument,
      entity.identityDocumentNumber
    )
  }
}
