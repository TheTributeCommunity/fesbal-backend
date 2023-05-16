import { Booster, Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { PickUpStarted } from '../../events/pick-up/pick-up-started'
import { getUserId } from '../../common/user-utils'
import { Recipient } from '../../entities/recipient'

@Command({
  authorize: 'all', // Specify authorized roles here. Use 'all' to authorize anyone
})
export class StartPickUp {
  public constructor(readonly recipientId: UUID) {}

  public static async handle(command: StartPickUp, register: Register): Promise<UUID> {
    const pickUpId = UUID.generate()
    const entityId = getUserId(register)

    const recipient = await Booster.entity(Recipient, command.recipientId)

    if (!recipient) {
      throw new Error(`Recipient ${command.recipientId} not found`)
    }

    //TODO: implement user validation
    register.events(
      new PickUpStarted(
        pickUpId,
        entityId,
        command.recipientId,
        recipient.firstName,
        recipient.lastName,
        recipient.identityDocumentNumber,
        recipient.relativesIds.length,
        new Date().getTime()
      )
    )

    return pickUpId
  }
}
