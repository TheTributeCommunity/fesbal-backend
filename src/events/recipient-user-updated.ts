import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class RecipientUserUpdated {
  public constructor(
    readonly recipientUserId: UUID,
    readonly firstName?: string,
    readonly lastName?: string,
    readonly dateOfBirth?: string,
    readonly email?: string,
    readonly password?: string,
    readonly typeOfIdentityDocument?: 'ID' | 'passport',
    readonly identityDocumentNumber?: string,
    readonly familyMembersCount?: number
  ) {}

  public entityID(): UUID {
    return this.recipientUserId
  }
}
