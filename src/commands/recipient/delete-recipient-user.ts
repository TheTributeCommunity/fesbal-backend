import { Booster, Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { RecipientUserDeleted } from '../../events/recipient-user-deleted'
import { Recipient } from '../../entities/recipient'
import { RecipientUserNotFoundError } from '../../common/errors/recipient-user-not-found-error'

@Command({
  authorize: 'all',
})
export class DeleteRecipientUser {
  public constructor(readonly recipientUserId: UUID) {}

  public static async handle(command: DeleteRecipientUser, register: Register): Promise<void> {
    const currentRecipientUser = await Booster.entity(Recipient, command.recipientUserId)
    if (!currentRecipientUser) {
      throw new RecipientUserNotFoundError(command.recipientUserId)
    }

    register.events(new RecipientUserDeleted(command.recipientUserId))
  }
}
