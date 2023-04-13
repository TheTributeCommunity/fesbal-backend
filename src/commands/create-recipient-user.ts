import { Command } from '@boostercloud/framework-core'
import { Register } from '@boostercloud/framework-types'
import { RecipientCreated as RecipientCreated } from '../events/recipient-created'
import { AuthService } from '../services/auth-service'
import { TypeOfIdentityDocument } from '../common/type-of-identity-document'
import { RecipientUserNotFoundInFirebaseError as RecipientNotFoundInFirebaseError } from '../common/recipient-user-not-registered-in-firebase-error'
import { UserRole } from '../common/user-role'
import { getUserId } from '../common/user-utils'

@Command({
  authorize: 'all',
})
export class CreateRecipient {
  public constructor(
    readonly firstName: string,
    readonly lastName: string,
    readonly dateOfBirth: string,
    readonly typeOfIdentityDocument: TypeOfIdentityDocument,
    readonly identityDocumentNumber: string,
    readonly phone: string,
    readonly email: string
  ) {}

  public static async handle(command: CreateRecipient, register: Register): Promise<void> {
    const userId: string = getUserId(register)
    await AuthService.setRole(userId, UserRole.Recipient).catch((error) => {
      console.log(error)
      throw new RecipientNotFoundInFirebaseError(userId)
    })

    register.events(
      new RecipientCreated(
        userId,
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
