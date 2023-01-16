import { Booster, Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { RecipientUserUpdated } from '../events/recipient-user-updated'
import { RecipientUserNotFoundError } from '../common/recipient-user-not-found-error'
import { RecipientUser } from '../entities/recipient-user'

@Command({
  authorize: 'all', // Specify authorized roles here. Use 'all' to authorize anyone
})
export class UpdateRecipientUser {
  public constructor(
    readonly recipientUserId: UUID,
    readonly firstName?: string,
    readonly lastName?: string,
    readonly dateOfBirth?: string,
    readonly email?: string,
    readonly password?: string,
    readonly typeOfIdentityDocument?: 'ID' | 'passport',
    readonly identityDocumentNumber?: string,
    readonly familyMembersCount?: number
  ) {}

  public static async handle(command: UpdateRecipientUser, register: Register): Promise<void> {
    const currentRecipientUser = await Booster.entity(RecipientUser, command.recipientUserId)
    if (!currentRecipientUser) {
      throw new RecipientUserNotFoundError(command.recipientUserId)
    }

    register.events(
      new RecipientUserUpdated(
        command.recipientUserId,
        command.firstName,
        command.lastName,
        command.dateOfBirth,
        command.email,
        command.password,
        command.typeOfIdentityDocument,
        command.identityDocumentNumber,
        command.familyMembersCount
      )
    )
  }
}
