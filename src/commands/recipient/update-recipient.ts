import { Booster, Command } from '@boostercloud/framework-core'
import { Register } from '@boostercloud/framework-types'
import { TypeOfIdentityDocument } from '../../common/type-of-identity-document'
import { RecipientUpdated } from '../../events/recipient/recipient-updated'
import { getUserId } from '../../common/user-utils'
import { Recipient } from '../../entities/recipient'
import { AuthService } from '../../services/auth-service'

@Command({
  authorize: 'all', // Specify authorized roles here. Use 'all' to authorize anyone
})
export class UpdateRecipient {
  public constructor(
    readonly firstName?: string,
    readonly lastName?: string,
    readonly dateOfBirth?: string,
    readonly typeOfIdentityDocument?: TypeOfIdentityDocument,
    readonly identityDocumentNumber?: string,
    readonly phone?: string,
    readonly email?: string
  ) {}

  public static async handle(command: UpdateRecipient, register: Register): Promise<void> {
    const recipientId = getUserId(register)
    const recipient = await Booster.entity(Recipient, recipientId)

    if (!recipient) {
      throw new Error('Recipient not found')
    }

    if (command.email && recipient?.email !== command.email) {
      await AuthService.updateUserEmail(recipientId, command.email)
    }

    if (command.phone && recipient?.phone !== command.phone) {
      await AuthService.updateUserPhone(recipientId, command.phone)
    }

    register.events(
      new RecipientUpdated(
        recipientId,
        command.firstName,
        command.lastName,
        command.dateOfBirth,
        command.typeOfIdentityDocument,
        command.identityDocumentNumber,
        command.phone,
        command.email
      )
    )
  }
}
