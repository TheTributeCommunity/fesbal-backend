import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class RecipientUserCreated {
  public constructor(
    readonly recipientUserId: UUID,
    readonly firstName: string,
    readonly lastName: string,
    readonly email: string,
    readonly password: string,
    readonly dateOfBirth: string,
    readonly address: string,
    readonly phone: number,
    readonly familyMembersCount: number
  ) {}

  public entityID(): UUID {
    return this.recipientUserId
  }
}
