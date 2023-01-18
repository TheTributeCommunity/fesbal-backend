import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { RecipientUserCreated } from '../events/recipient-user-created'
import { RecipientUserDeleted } from '../events/recipient-user-deleted'
import { RecipientUserEmailUpdated } from '../events/recipient-user-email-updated'
import { RecipientUserRegistrationRequested } from '../events/recipient-user-registration-requested'
import { RecipientUserRole } from '../common/recipient-user-role'
import { TypeOfIdentityDocument } from '../common/type-of-identity-document'
import { RelativeAddedToRecipientUser } from '../events/relative-added-to-recipient-user'

@Entity
export class RecipientUser {
  public constructor(
    public id: UUID,
    readonly firstName: string,
    readonly lastName: string,
    readonly dateOfBirth: string,
    readonly typeOfIdentityDocument: TypeOfIdentityDocument,
    readonly identityDocumentNumber: string,
    readonly phone: number,
    readonly phoneVerified: boolean = true,
    readonly email?: string,
    readonly relatives?: Array<UUID>,
    readonly referralSheet?: string,
    readonly role: RecipientUserRole = RecipientUserRole.UserRegistered,
    readonly deleted: boolean = false
  ) {}

  private static createEmpty(): RecipientUser {
    return new RecipientUser(
      UUID.generate(),
      '',
      '',
      '',
      TypeOfIdentityDocument.ID,
      '',
      0,
      false,
      '',
      [],
      '',
      RecipientUserRole.UserRegistered,
      true
    )
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
      role: RecipientUserRole.UserPending,
    }
  }
  @Reduces(RelativeAddedToRecipientUser)
  public static reduceRelativeAddedToRecipientUser(
    event: RelativeAddedToRecipientUser,
    currentRecipientUser?: RecipientUser
  ): RecipientUser {
    if (!currentRecipientUser) {
      return RecipientUser.createEmpty()
    }
    const relatives = currentRecipientUser.relatives ?? []

    relatives.push(event.relativeId)

    return {
      ...currentRecipientUser,
      relatives: relatives,
    }
  }
}
