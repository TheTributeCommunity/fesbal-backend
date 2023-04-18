import { Booster, EventHandler } from '@boostercloud/framework-core'
import { Register } from '@boostercloud/framework-types'
import { PickUpSubmitted } from '../events/pick-up/pick-up-submitted'
import { PickUp } from '../entities/pick-up'
import { SignRequested } from '../events/pick-up/sign-requested'
import { PickUpSigned } from '../events/pick-up/pick-up-signed'
import { PickUpAddedToRecipient } from '../events/pick-up/pick-up-added-to-recipient'

@EventHandler(PickUpSubmitted)
export class HandlePickUpSubmitted {
  public static async handle(event: PickUpSubmitted, register: Register): Promise<void> {
    const pickUp = await Booster.entity(PickUp, event.pickUpId)
    if (!pickUp) {
      throw new Error('PickUp not found')
    }

    register.events(new SignRequested(event.pickUpId, pickUp.receiptId))
  }
}

@EventHandler(PickUpSigned)
export class HandlePickUpSigned {
  public static async handle(event: PickUpSigned, register: Register): Promise<void> {
    const pickUp = await Booster.entity(PickUp, event.pickUpId)
    if (!pickUp) {
      throw new Error('PickUp not found')
    }

    register.events(new PickUpAddedToRecipient(event.pickUpId, event.recipientId))
    //TODO: Add event to update entity pickUps
  }
}
