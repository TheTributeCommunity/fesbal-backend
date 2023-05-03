import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { PickUpSubmitted } from '../../events/pick-up/pick-up-submitted'

@Command({
  authorize: 'all', // Specify authorized roles here. Use 'all' to authorize anyone
})
export class SubmitPickUp {
  public constructor(readonly pickUpId: UUID) {}

  public static async handle(command: SubmitPickUp, register: Register): Promise<void> {
    register.events(new PickUpSubmitted(command.pickUpId, Date.now()))
  }
}
