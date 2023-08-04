import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { TypeOfIdentityDocument } from '../../common/type-of-identity-document'

@Event
export class RecipientUpdated {
  public constructor(
    readonly recipientId: UUID,
    readonly firstName?: string,
    readonly lastName?: string,
    readonly dateOfBirth?: string,
    readonly typeOfIdentityDocument?: TypeOfIdentityDocument,
    readonly identityDocumentNumber?: string,
    readonly phone?: string,
    readonly email?: string
  ) {}

  public entityID(): UUID {
    return this.recipientId
  }
}
