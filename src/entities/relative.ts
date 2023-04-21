import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { TypeOfIdentityDocument } from '../common/type-of-identity-document'
import { RelativeCreated } from '../events/relative/relative-created'
import { RelativeDeleted } from '../events/relative/relative-deleted'
import { RelativeUpdated } from '../events/relative/relative-updated'

@Entity
export class Relative {
  public constructor(
    readonly id: UUID,
    readonly recipientId: UUID,
    readonly firstName: string,
    readonly lastName: string,
    readonly dateOfBirth: string,
    readonly typeOfIdentityDocument?: TypeOfIdentityDocument,
    readonly identityDocumentNumber?: string,
    readonly isDeleted: boolean = false
  ) {}

  static relativeNotFound = new Relative(new UUID(0), new UUID(0), '', '', '', TypeOfIdentityDocument.DNI, '', true)

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

  @Reduces(RelativeUpdated)
  public static reduceRelativeUpdated(event: RelativeUpdated, currentRelative?: Relative): Relative {
    if (!currentRelative) {
      return Relative.relativeNotFound
    }

    return {
      ...currentRelative,
      firstName: event.firstName ?? currentRelative.firstName,
      lastName: event.lastName ?? currentRelative.lastName,
      dateOfBirth: event.dateOfBirth ?? currentRelative.dateOfBirth,
      typeOfIdentityDocument: event.typeOfIdentityDocument ?? currentRelative.typeOfIdentityDocument,
      identityDocumentNumber: event.identityDocumentNumber ?? currentRelative.identityDocumentNumber,
    }
  }

  @Reduces(RelativeDeleted)
  public static reduceRelativeDeleted(event: RelativeDeleted, currentRelative?: Relative): Relative {
    if (!currentRelative) {
      return Relative.relativeNotFound
    }

    return {
      ...currentRelative,
      isDeleted: true,
    }
  }
}
