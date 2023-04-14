import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { PickUpStarted } from '../../events/pick-up/pick-up-started'

@Command({
  authorize: 'all', // Specify authorized roles here. Use 'all' to authorize anyone
})
export class StartPickUp {
  public constructor(readonly receiptId: UUID, readonly items: Map<string, string>) {}

  public static async handle(command: StartPickUp, register: Register): Promise<void> {
    const pickUpId = UUID.generate()
    register.events(new PickUpStarted(pickUpId, command.receiptId, 'entityId', command.items, new Date()))
  }
}
