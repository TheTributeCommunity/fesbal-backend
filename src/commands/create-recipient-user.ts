import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { RecipientUserCreated } from '../events/recipient-user-created'
import { AuthService } from '../services/auth-service'
import { TypeOfIdentityDocument } from '../common/type-of-identity-document'
import { RecipientUserNotFoundInFirebaseError } from '../common/recipient-user-not-registered-in-firebase-error'
import { Recipient } from '../config/roles'
import { RecipientUserRole } from '../common/recipient-user-role'

@Command({
  authorize: [Recipient],
})
export class CreateRecipient {
  public constructor(
    readonly recipientUserId: UUID,
    readonly firstName: string,
    readonly lastName: string,
    readonly dateOfBirth: string,
    readonly typeOfIdentityDocument: TypeOfIdentityDocument,
    readonly identityDocumentNumber: string,
    readonly phone: string,
    readonly email: string
  ) {}

  public static async handle(command: CreateRecipient, register: Register): Promise<void> {
    await AuthService.setRole(register.currentUser?.claims.user_id as string, RecipientUserRole.UserRegistered).catch(
      (error) => {
        console.log(error)
        throw new RecipientUserNotFoundInFirebaseError(command.recipientUserId)
      }
    )

    register.events(
      new RecipientUserCreated(
        command.recipientUserId,
        command.firstName,
        command.lastName,
        command.dateOfBirth,
        command.typeOfIdentityDocument,
        command.identityDocumentNumber,
        command.phone,
        command.email
      )
    )
  }
}
