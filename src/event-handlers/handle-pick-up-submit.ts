import { Booster, EventHandler } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { PickUpSubmitted } from '../events/pick-up/pick-up-submitted'
import { PickUp } from '../entities/pick-up'
import { SignRequested } from '../events/pick-up/sign-requested'
import { Recipient } from '../entities/recipient'
import { NewNotification } from '../events/notification/new-notification'
import { RecipientNotified } from '../events/notification/recipient-notified'

@EventHandler(PickUpSubmitted)
export class HandlePickUpSubmitted {
  public static async handle(event: PickUpSubmitted, register: Register): Promise<void> {
    const pickUp = await Booster.entity(PickUp, event.pickUpId)
    if (!pickUp) {
      throw new Error('PickUp not found')
    }

    const recipient = await Booster.entity(Recipient, pickUp.receiptId)
    if (!recipient) {
      throw new Error('Recipient not found')
    }
    const notificationId = UUID.generate()
    register.events(new SignRequested(pickUp.receiptId, event.pickUpId))
    register.events(
      new NewNotification(
        notificationId,
        recipient?.id,
        'Tiene una entrega pendiente de firmar',
        `Hola ${recipient?.firstName}!, Tienes una entrega pendiente de firmar. Por favor, accede a la aplicación para firmarla.`,
        false,
        new Date().getTime(),
        undefined,
        false
      )
    )
    register.events(new RecipientNotified(recipient?.id, notificationId))
  }
}
