import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { RecipientUserUpdated } from '../events/recipient-user-updated'

@Command({
  authorize: 'all', // Specify authorized roles here. Use 'all' to authorize anyone
})
export class UpdateRecipientUser {
  public constructor(
    readonly recipientUserId: UUID,
    readonly firstName: string,
    readonly lastName: string,
    readonly password: string,
    readonly dateOfBirth: string,
    readonly address: string,
    readonly phone: number,
    readonly familyMembersCount: number
  ) {}

  public static async handle(command: UpdateRecipientUser, register: Register): Promise<void> {
    register.events(
      new RecipientUserUpdated(
        command.recipientUserId,
        command.firstName,
        command.lastName,
        command.password,
        command.dateOfBirth,
        command.address,
        command.phone,
        command.familyMembersCount
      )
    )
  }
}
