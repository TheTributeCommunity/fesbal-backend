import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { RecipientUserCreated } from '../events/recipient-user-created'
import { User } from '../config/roles'

@Command({
  authorize: [User], // Specify authorized roles here. Use 'all' to authorize anyone
})
export class CreateRecipientUser {
  public constructor(
    readonly recipientUserId: UUID,
    readonly firstName: string,
    readonly lastName: string,
    readonly dateOfBirth: string,
    readonly phone: number
  ) {}

  public static async handle(command: CreateRecipientUser, register: Register): Promise<void> {
    register.events(
      new RecipientUserCreated(
        command.recipientUserId,
        command.firstName,
        command.lastName,
        command.dateOfBirth,
        command.phone
      )
    )
  }
}
