import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { RecipientUserCreated } from '../events/recipient-user-created'
import { RecipientUserDeleted } from '../events/recipient-user-deleted'
import { RecipientUserEmailUpdated } from '../events/recipient-user-email-updated'
import {RecipientUserRegistrationRequested} from "../events/recipient-user-registration-requested";

@Entity
export class RecipientUser {
  public constructor(
    public id: UUID,
    readonly firstName: string,
    readonly lastName: string,
    readonly dateOfBirth: string,
    readonly typeOfIdentityDocument: 'ID' | 'passport',
    readonly identityDocumentNumber: string,
    readonly phone: number,
    readonly phoneVerified: boolean = true,
    readonly email?: string,
    readonly referralSheet?: string,
    readonly role: 'UserRegistered' | 'UserPending' | 'UserVerified' = 'UserRegistered',
    readonly deleted: boolean = false
  ) {}

  private static createEmpty() {
    return new RecipientUser(UUID.generate(), '', '', '', 'ID', '', 0, false, '', '', 'UserRegistered', true)
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
      event.dateOfBirth,
      event.typeOfIdentityDocument,
      event.identityDocumentNumber,
      event.phone
    )
  }
  @Reduces(RecipientUserEmailUpdated)
  public static reduceRecipientUserEmailUpdated(
    event: RecipientUserEmailUpdated,
    currentRecipientUser?: RecipientUser
  ): RecipientUser {
    if (!currentRecipientUser) {
      return RecipientUser.createEmpty()
    }

    return {
      ...currentRecipientUser,
      email: event.email,
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

  @Reduces(RecipientUserRegistrationRequested)
  public static reduceRecipientUserRoleUpdated(
    event: RecipientUserRegistrationRequested,
    currentRecipientUser?: RecipientUser
  ): RecipientUser {
    if (!currentRecipientUser) {
      return RecipientUser.createEmpty()
    }

    return {
      ...currentRecipientUser,
      role: 'UserPending',
    }
  }
}
