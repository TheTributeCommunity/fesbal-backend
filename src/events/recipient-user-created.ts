import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { TypeOfIdentityDocument } from '../common/type-of-identity-document'

@Event
export class RecipientUserCreated {
  public constructor(
    readonly recipientUserId: UUID,
    readonly firstName: string,
    readonly lastName: string,
    readonly dateOfBirth: string,
    readonly typeOfIdentityDocument: TypeOfIdentityDocument,
    readonly identityDocumentNumber: string,
    readonly phone: number
  ) {}

  public entityID(): UUID {
    return this.recipientUserId
  }
}
