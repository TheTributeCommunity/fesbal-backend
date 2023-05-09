import { Booster, EventHandler } from '@boostercloud/framework-core'
import { PickUpSubmitted } from '../events/pick-up/pick-up-submitted'
import { PickUp } from '../entities/pick-up'
import { SignRequested } from '../events/pick-up/sign-requested'
import { Register, UUID } from '@boostercloud/framework-types'
import { RecipientNotified } from '../events/notification/recipient-notified'
import { NewNotification } from '../events/notification/new-notification'

@EventHandler(PickUpSubmitted)
export class HandlePickUpSubmitted {
  public static async handle(event: PickUpSubmitted, register: Register): Promise<void> {
    const pickUp = await Booster.entity(PickUp, event.pickUpId)

    if (!pickUp) {
      throw new Error(`PickUp ${event.pickUpId} not found... {${pickUp}}`)
    }
    register.events(new SignRequested(pickUp.recipientId, event.pickUpId))

    const notificationId = UUID.generate()
    register.events(
      new NewNotification(
        notificationId,
        pickUp.recipientId,
        'Tiene una entrega pendiente de firmar',
        `Hola ${pickUp.recipientFirstName}!, Tienes una entrega pendiente de firmar. Por favor, accede a la aplicación para firmarla.`,
        false,
        new Date().getTime(),
        undefined,
        false
      )
    )
    register.events(new RecipientNotified(pickUp.recipientId, notificationId))
  }
}
