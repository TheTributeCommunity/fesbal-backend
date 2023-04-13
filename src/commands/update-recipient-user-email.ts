import { Booster, Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { RecipientUserEmailUpdated } from '../events/recipient-email-updated'
import { RecipientUserNotFoundError } from '../common/recipient-user-not-found-error'
import { Recipient } from '../entities/recipient'

@Command({
  authorize: 'all',
})
export class UpdateRecipientUserEmail {
  public constructor(readonly recipientUserId: UUID, readonly email: string) {}

  public static async handle(command: UpdateRecipientUserEmail, register: Register): Promise<void> {
    const currentRecipientUser = await Booster.entity(Recipient, command.recipientUserId)
    if (!currentRecipientUser) {
      throw new RecipientUserNotFoundError(command.recipientUserId)
    }

    register.events(new RecipientUserEmailUpdated(command.recipientUserId, command.email))
  }
}
