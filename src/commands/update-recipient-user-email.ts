import { Booster, Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { RecipientUserEmailUpdated } from '../events/recipient-user-email-updated'
import { RecipientUserNotFoundError } from '../common/recipient-user-not-found-error'
import { RecipientUser } from '../entities/recipient-user'
import { User } from '../common/roles'

@Command({
  authorize: [User],
})
export class UpdateRecipientUserEmail {
  public constructor(readonly recipientUserId: UUID, readonly email: string) {}

  public static async handle(command: UpdateRecipientUserEmail, register: Register): Promise<void> {
    const currentRecipientUser = await Booster.entity(RecipientUser, command.recipientUserId)
    if (!currentRecipientUser) {
      throw new RecipientUserNotFoundError(command.recipientUserId)
    }

    register.events(new RecipientUserEmailUpdated(command.recipientUserId, command.email))
  }
}
