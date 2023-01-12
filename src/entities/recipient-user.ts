import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { RecipientUserCreated } from '../events/recipient-user-created'
import { RecipientUserUpdated } from '../events/recipient-user-updated'
import { RecipientUserNotFoundError } from '../common/recipient-user-not-found-error'

@Entity
export class RecipientUser {
  public constructor(
    public id: UUID,
    readonly firstName: string,
    readonly lastName: string,
    readonly password: string,
    readonly dateOfBirth: string,
    readonly address: string,
    readonly phone: number,
    readonly familyMembersCount: number
  ) {}

  @Reduces(RecipientUserCreated)
  public static reduceRecipientUserCreated(
    event: RecipientUserCreated,
    currentRecipientUser?: RecipientUser
  ): RecipientUser {
    return new RecipientUser(
      event.recipientUserId,
      event.firstName,
      event.lastName,
      event.password,
      event.dateOfBirth,
      event.address,
      event.phone,
      event.familyMembersCount
    )
  }
  @Reduces(RecipientUserUpdated)
  public static reduceRecipientUserUpdated(
    event: RecipientUserUpdated,
    currentRecipientUser?: RecipientUser
  ): RecipientUser {
    if (!currentRecipientUser) {
      throw new RecipientUserNotFoundError(event.recipientUserid)
    }

    return {
      ...currentRecipientUser,
      firstName: event.firstName,
      lastName: event.lastName,
      password: event.password,
      dateOfBirth: event.dateOfBirth,
      address: event.address,
      phone: event.phone,
      familyMembersCount: event.familyMembersCount,
    }
  }
}
