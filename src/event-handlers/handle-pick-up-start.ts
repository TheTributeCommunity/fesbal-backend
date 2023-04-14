import { PickUpStarted } from '../events/pick-up/pick-up-started'
import { EventHandler } from '@boostercloud/framework-core'
import { Register } from '@boostercloud/framework-types'
import { SignRequested } from '../events/pick-up/sign-requested'

@EventHandler(PickUpStarted)
export class HandlePickUpStart {
  public static async handle(event: PickUpStarted, register: Register): Promise<void> {
    register.events(new SignRequested(event.pickUpId, event.receiptId))
  }
}
