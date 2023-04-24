import { Booster, Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { PickUpSigned } from '../../events/pick-up/pick-up-signed'
import { PickUp } from '../../entities/pick-up'

@Command({
  authorize: 'all', // Specify authorized roles here. Use 'all' to authorize anyone
})
export class SignPickUp {
  public constructor(readonly pickUpId: UUID) {}

  public static async handle(command: SignPickUp, register: Register): Promise<void> {
    const pickIp = await Booster.entity(PickUp, command.pickUpId)

    if (!pickIp) {
      throw new Error('PickUp not found')
    } else if (pickIp.endedAt) {
      throw new Error('PickUp already closed')
    }

    register.events(new PickUpSigned(command.pickUpId, 'recipientId', new Date()))
    //TODO: maybe new event to update user
  }
}
