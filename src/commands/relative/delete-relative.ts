import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { RelativeDeleted } from '../../events/relative/relative-deleted'
import { getUserId } from '../../common/user-utils'
import { RelativeDeletedFromRecipient } from '../../events/relative/relative-deleted-from-recipient'

@Command({
  authorize: 'all', // Specify authorized roles here. Use 'all' to authorize anyone
})
export class DeleteRelative {
  public constructor(readonly relativeId: UUID) {}

  public static async handle(command: DeleteRelative, register: Register): Promise<void> {
    const recipientId = getUserId(register)

    register.events(new RelativeDeletedFromRecipient(recipientId, command.relativeId))
    register.events(new RelativeDeleted(command.relativeId, recipientId))
  }
}
