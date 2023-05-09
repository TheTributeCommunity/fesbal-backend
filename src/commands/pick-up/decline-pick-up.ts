import { Booster, Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { PickUpDeclined } from '../../events/pick-up/pick-up-declined'
import { PickUp } from '../../entities/pick-up'

@Command({
  authorize: 'all', // Specify authorized roles here. Use 'all' to authorize anyone
})
export class DeclinePickUp {
  public constructor(readonly pickUpId: UUID) {}

  public static async handle(command: DeclinePickUp, register: Register): Promise<void> {
    const pickIp = await Booster.entity(PickUp, command.pickUpId)

    if (!pickIp) {
      throw new Error(`PickUp with id ${command.pickUpId} not found`)
    } else if (pickIp.endedAt) {
      throw new Error(`PickUp with id ${command.pickUpId} already closed`)
    }
    register.events(new PickUpDeclined(command.pickUpId, new Date().getTime()))
    //TODO: maybe new event to update user
  }
}
