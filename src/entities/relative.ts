import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { TypeOfIdentityDocument } from '../common/type-of-identity-document'
import { RelativeCreated } from '../events/relative-created'

@Entity
export class Relative {
  public constructor(
    readonly id: UUID,
    readonly recipientUserId: UUID,
    readonly firstName: string,
    readonly lastName: string,
    readonly dateOfBirth: string,
    readonly typeOfIdentityDocument: TypeOfIdentityDocument,
    readonly identityDocumentNumber: string
  ) {}
  @Reduces(RelativeCreated)
  public static reduceRelativeCreated(event: RelativeCreated, currentRelative?: Relative): Relative {
    return new Relative(
      event.relativeId,
      event.recipientUserId,
      event.firstName,
      event.lastName,
      event.dateOfBirth,
      event.typeOfIdentityDocument,
      event.identityDocumentNumber
    )
  }
}
