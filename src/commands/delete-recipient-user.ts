import { Booster, Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { RecipientUserDeleted } from '../events/recipient-user-deleted'
import { RecipientUser } from '../entities/recipient-user'
import { RecipientUserNotFoundError } from '../common/recipient-user-not-found-error'

@Command({
  authorize: 'all', // Specify authorized roles here. Use 'all' to authorize anyone
})
export class DeleteRecipientUser {
  public constructor(readonly recipientUserId: UUID) {}

  public static async handle(command: DeleteRecipientUser, register: Register): Promise<void> {
    const currentRecipientUser = await Booster.entity(RecipientUser, command.recipientUserId)
    if (!currentRecipientUser) {
      throw new RecipientUserNotFoundError(command.recipientUserId)
    }

    register.events(new RecipientUserDeleted(command.recipientUserId))
  }
}
