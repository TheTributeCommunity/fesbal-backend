import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { RecipientUserCreated } from '../events/recipient-user-created'
import { UserRegistered } from '../common/roles'
import { AuthService } from '../services/auth-service'
import { TypeOfIdentityDocument } from '../common/type-of-identity-document'
import { RecipientUserRole } from '../common/recipient-user-role'

@Command({
  authorize: [UserRegistered],
})
export class CreateRecipientUser {
  public constructor(
    readonly recipientUserId: UUID,
    readonly firstName: string,
    readonly lastName: string,
    readonly dateOfBirth: string,
    readonly typeOfIdentityDocument: TypeOfIdentityDocument,
    readonly identityDocumentNumber: string,
    readonly phone: number
  ) {}

  public static async handle(command: CreateRecipientUser, register: Register): Promise<void> {
    await AuthService.setRole(register.currentUser?.claims.user_id as string, RecipientUserRole.UserRegistered)
    register.events(
      new RecipientUserCreated(
        command.recipientUserId,
        command.firstName,
        command.lastName,
        command.dateOfBirth,
        command.typeOfIdentityDocument,
        command.identityDocumentNumber,
        command.phone
      )
    )
  }
}
