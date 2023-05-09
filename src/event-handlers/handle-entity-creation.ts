import { EntityCreated } from '../events/entity/entity-created'
import { EventHandler } from '@boostercloud/framework-core'
import { Register } from '@boostercloud/framework-types'
import { EmailService } from '../services/email-service'
import { EntityLoginSent } from '../events/entity/entity-login-sent'

@EventHandler(EntityCreated)
export class HandleEntityCreation {
  public static async handle(event: EntityCreated, register: Register): Promise<void> {
    const messageId = await EmailService.send({
      to: event.email,
      from: 'santiagogarcia@theagilemonkeys.com',
      subject: 'Alta de entidad en BALPA',
      body: `
      <h1>Bienvenido, ${event.entityName}!</h1>
      <p>Se te ha dado de alta en el sistema de BALPA con los siguientes datos:</p>
      <ul>
        <li>Nombre: ${event.entityName}</li>
        <li>Código: ${event.entityCode}</li>
        <li>Región: ${event.region}</li>
        <li>Dirección: ${event.address}</li>
        <li>Contacto: ${event.contactPerson}</li>
        <li>Teléfono: ${event.phone}</li>
        <li>Capacidad de almacenamiento: ${event.storingCapacity}m2</li>
      </ul>
      <p>Puedes iniciar sesion con las siguientes credenciales:</p>
      <ul>
        <li>Email: ${event.email}</li>
        <li>Contraseña: ${event.firstPassword}</li>
      </ul>
      `,
    })

    if (messageId === '') {
      throw new Error('Error sending email')
    }

    register.events(new EntityLoginSent(event.entityId, messageId, event.email, new Date().getTime()))
  }
}
