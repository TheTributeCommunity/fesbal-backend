import { Booster, Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { PickUpDeclined } from '../../events/pick-up/pick-up-declined'
import { PickUp } from '../../entities/pick-up'

@Command({
  authorize: 'all', // Specify authorized roles here. Use 'all' to authorize anyone
})
export class DeclinePickUp {
  public constructor(readonly pickUpId: UUID, readonly reason: string, readonly explanation: string) {}

  public static async handle(command: DeclinePickUp, register: Register): Promise<void> {
    const pickIp = await Booster.entity(PickUp, command.pickUpId)

    if (!pickIp) {
      throw new Error('PickUp not found')
    } else if (pickIp.endedAt) {
      throw new Error('PickUp already closed')
    }
    register.events(new PickUpDeclined(command.pickUpId, command.reason, command.explanation, new Date().getTime()))
    //TODO: maybe new event to update user
  }
}
