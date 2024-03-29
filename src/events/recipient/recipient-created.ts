import { Event } from '@boostercloud/framework-core'
import { TypeOfIdentityDocument } from '../../common/type-of-identity-document'

@Event
export class RecipientCreated {
  public constructor(
    readonly recipientId: string,
    readonly firstName: string,
    readonly lastName: string,
    readonly dateOfBirth: string,
    readonly typeOfIdentityDocument: TypeOfIdentityDocument,
    readonly identityDocumentNumber: string,
    readonly phone: string,
    readonly email?: string
  ) {}

  public entityID(): string {
    return this.recipientId
  }
}
