import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { TypeOfIdentityDocument } from '../../common/type-of-identity-document'

@Event
export class RelativeUpdated {
  public constructor(
    readonly relativeId: UUID,
    readonly firstName?: string,
    readonly lastName?: string,
    readonly dateOfBirth?: number,
    readonly typeOfIdentityDocument?: TypeOfIdentityDocument,
    readonly identityDocumentNumber?: string
  ) {}

  public entityID(): UUID {
    return this.relativeId
  }
}
