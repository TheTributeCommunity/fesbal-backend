import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { PickUpStarted } from '../../events/pick-up/pick-up-started'
import { getUserId } from '../../common/user-utils'

@Command({
  authorize: 'all', // Specify authorized roles here. Use 'all' to authorize anyone
})
export class StartPickUp {
  public constructor(readonly receiptId: UUID) {}

  public static async handle(command: StartPickUp, register: Register): Promise<UUID> {
    const pickUpId = UUID.generate()
    const entityId = getUserId(register)

    //TODO: implement user validation

    register.events(new PickUpStarted(pickUpId, command.receiptId, entityId, new Date()))

    return pickUpId
  }
}
