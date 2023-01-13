import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { RecipientUserCreated } from '../events/recipient-user-created'
import { RecipientUserUpdated } from '../events/recipient-user-updated'
import { RecipientUserDeleted } from '../events/recipient-user-deleted'

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
    readonly familyMembersCount: number,
    readonly deleted: boolean = false
  ) {}

  private static createEmpty() {
    return new RecipientUser(UUID.generate(), '', '', '', '', '', 0, 0, true)
  }

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
      return RecipientUser.createEmpty()
    }

    return {
      ...currentRecipientUser,
      firstName: event.firstName ?? currentRecipientUser.firstName,
      lastName: event.lastName ?? currentRecipientUser.lastName,
      password: event.password ?? currentRecipientUser.password,
      dateOfBirth: event.dateOfBirth ?? currentRecipientUser.dateOfBirth,
      address: event.address ?? currentRecipientUser.address,
      phone: event.phone ?? currentRecipientUser.phone,
      familyMembersCount: event.familyMembersCount ?? currentRecipientUser.familyMembersCount,
    }
  }

  @Reduces(RecipientUserDeleted)
  public static reduceRecipientUserDeleted(
    event: RecipientUserDeleted,
    currentRecipientUser?: RecipientUser
  ): RecipientUser {
    if (!currentRecipientUser) {
      return RecipientUser.createEmpty()
    }

    return {
      ...currentRecipientUser,
      deleted: true,
    }
  }
}
