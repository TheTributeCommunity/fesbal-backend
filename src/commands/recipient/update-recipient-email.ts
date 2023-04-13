import { Booster, Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { RecipientUserNotFoundError } from '../../common/errors/recipient-user-not-found-error'
import { Recipient } from '../../entities/recipient'
import { RecipientEmailUpdated } from '../../events/recipient/recipient-email-updated'

@Command({
  authorize: 'all',
})
export class UpdateRecipientEmail {
  public constructor(readonly recipientId: UUID, readonly email: string) {}

  public static async handle(command: UpdateRecipientEmail, register: Register): Promise<void> {
    const currentRecipientUser = await Booster.entity(Recipient, command.recipientId)
    if (!currentRecipientUser) {
      throw new RecipientUserNotFoundError(command.recipientId)
    }

    register.events(new RecipientEmailUpdated(command.recipientId, command.email))
  }
}