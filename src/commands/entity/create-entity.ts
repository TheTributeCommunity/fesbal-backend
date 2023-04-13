import { Command } from '@boostercloud/framework-core'
import { Register } from '@boostercloud/framework-types'
import { EntityCreated } from '../../events/entity/entity-created'
import { getUserId } from '../../common/user-utils'
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
    const userId: string = getUserId(register)
    await AuthService.setRole(userId, UserRole.Entity).catch((error) => {
      console.log(error)
      throw new Error('Entity not found in Firebase')
    })

    register.events(
      new EntityCreated(
        userId,
        command.entityName,
        command.entityCode,
        command.region,
        command.address,
        command.contactPerson,
        command.email,
        command.phone,
        command.storingCapacity || 0
      )
    )
  }
}
