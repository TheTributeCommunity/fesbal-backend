import { Command } from '@boostercloud/framework-core'
import { Register } from '@boostercloud/framework-types'
import { EntityCreated } from '../../events/entity/entity-created'
import { AuthService } from '../../services/auth-service'
import { UserRole } from '../../common/user-role'

@Command({
  authorize: 'all',
})
export class CreateEntity {
  public constructor(
    readonly entityName: string,
    readonly entityCode: string,
    readonly region: string,
    readonly address: string,
    readonly contactPerson: string,
    readonly email: string,
    readonly phone: string,
    readonly storingCapacity?: number
  ) {}

  public static async handle(command: CreateEntity, register: Register): Promise<void> {
    const firstPassword = 'demodemo1'
    const entityId = await AuthService.createUser(command.email, command.entityName, firstPassword).catch((error) => {
      console.log(error)
      throw new Error('Error creating entity')
    })

    AuthService.setRole(entityId, UserRole.Entity).catch((error) => {
      console.log(error)
      throw new Error('Entity not found')
    })

    register.events(
      new EntityCreated(
        entityId,
        command.entityName,
        command.entityCode,
        command.region,
        command.address,
        command.contactPerson,
        command.email,
        command.phone,
        firstPassword,
        command.storingCapacity || 0
      )
    )
  }
}
