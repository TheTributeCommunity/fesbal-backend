import { Booster, EventHandler } from '@boostercloud/framework-core'
import { Register } from '@boostercloud/framework-types'
import { PickUp } from '../entities/pick-up'
import { PickUpSigned } from '../events/pick-up/pick-up-signed'
import { RecipientPickUpDone } from '../events/pick-up/recipient-pick-up-done'
import { EntityDeliveryDone } from '../events/pick-up/entity-delivery-done'
@EventHandler(PickUpSigned)
export class HandlePickUpSigned {
  public static async handle(event: PickUpSigned, register: Register): Promise<void> {
    const pickUp = await Booster.entity(PickUp, event.pickUpId)
    if (!pickUp) {
      throw new Error('PickUp not found')
    }

    register.events(
      new RecipientPickUpDone(event.recipientId, event.pickUpId),
      new EntityDeliveryDone(pickUp.entityId, event.pickUpId)
    )
  }
}
