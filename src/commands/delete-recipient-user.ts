import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { RecipientUserDeleted } from '../events/recipient-user-deleted'

@Command({
  authorize: 'all', // Specify authorized roles here. Use 'all' to authorize anyone
})
export class DeleteRecipientUser {
  public constructor(readonly recipientUserId: UUID) {}

  public static async handle(command: DeleteRecipientUser, register: Register): Promise<void> {
    register.events(new RecipientUserDeleted(command.recipientUserId))
  }
}
