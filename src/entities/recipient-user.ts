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
    readonly dateOfBirth: string,
    readonly phone: number,
    readonly phone_verified: boolean = false,
    readonly email?: string,
    readonly password?: string,
    readonly typeOfIdentityDocument?: 'ID' | 'passport',
    readonly identityDocumentNumber?: string,
    readonly familyMembersCount?: number,
    readonly referralSheet?: string,
    readonly applicationStatus?: string,
    readonly deleted: boolean = false
  ) {}

  private static createEmpty() {
    return new RecipientUser(UUID.generate(), '', '', '', 0, false, '', '', 'ID', '', 0, '', '', true)
  }

  @Reduces(RecipientUserCreated)
  public static reduceRecipientUserCreated(
    event: RecipientUserCreated,
    currentRecipientUser?: RecipientUser
  ): RecipientUser {
    return new RecipientUser(event.recipientUserId, event.firstName, event.lastName, event.dateOfBirth, event.phone)
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
      dateOfBirth: event.dateOfBirth ?? currentRecipientUser.dateOfBirth,
      email: event.email ?? currentRecipientUser.email,
      password: event.password ?? currentRecipientUser.password,
      typeOfIdentityDocument: event.typeOfIdentityDocument ?? currentRecipientUser.typeOfIdentityDocument,
      identityDocumentNumber: event.identityDocumentNumber ?? currentRecipientUser.identityDocumentNumber,
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
