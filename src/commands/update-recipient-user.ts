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
    readonly email?: string,
    readonly password?: string,
    readonly dateOfBirth?: string,
    readonly address?: string,
    readonly phone?: number,
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
        command.email,
        command.password,
        command.dateOfBirth,
        command.address,
        command.phone,
        command.familyMembersCount
      )
    )
  }
}
