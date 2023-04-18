import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { PickUpSigned } from '../../events/pick-up/pick-up-signed'

@Command({
  authorize: 'all', // Specify authorized roles here. Use 'all' to authorize anyone
})
export class SignPickUp {
  public constructor(readonly pickUpId: UUID) {}

  public static async handle(command: SignPickUp, register: Register): Promise<void> {
    register.events(new PickUpSigned(command.pickUpId, 'recipientId', new Date()))
  }
}
