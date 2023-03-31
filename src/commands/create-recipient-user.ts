import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { RecipientUserCreated } from '../events/recipient-user-created'
import { AuthService } from '../services/auth-service'
import { TypeOfIdentityDocument } from '../common/type-of-identity-document'
import { UserRole } from '../common/user-role'
import { RecipientUserNotFoundInFirebaseError } from '../common/recipient-user-not-registered-in-firebase-error'

@Command({
  authorize: 'all',
})
export class CreateRecipientUser {
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

  public static async handle(command: CreateRecipientUser, register: Register): Promise<void> {
    const userId: string = register.currentUser?.claims.user_id as string
    await AuthService.setRole(userId, UserRole.Recipient).catch((error) => {
      console.log(error)
      throw new RecipientUserNotFoundInFirebaseError(userId)
    })

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
