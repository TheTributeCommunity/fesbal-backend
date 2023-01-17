import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { RecipientUserCreated } from '../events/recipient-user-created'
import { RecipientUser } from '../config/roles'

@Command({
  authorize: [RecipientUser],
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
