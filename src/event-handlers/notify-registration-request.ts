import { RegistrationRequestSent } from '../events/recipient/registration-request-sent'
import { EventHandler } from '@boostercloud/framework-core'
import { Register } from '@boostercloud/framework-types'

//TODO: Pending implementation with Fesbal UI
@EventHandler(RegistrationRequestSent)
export class HandleRegistrationRequest {
  public static async handle(event: RegistrationRequestSent, register: Register): Promise<void> {}
}
