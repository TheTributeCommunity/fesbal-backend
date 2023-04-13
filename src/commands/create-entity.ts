import { Command } from '@boostercloud/framework-core'
import { Register } from '@boostercloud/framework-types'
import { EntityCreated } from '../events/entity-created'
import { getUserId } from '../common/user-utils'
import { AuthService } from '../services/auth-service'
import { UserRole } from '../common/user-role'

@Command({
  authorize: 'all',
})
export class CreateEntity {
  public constructor(readonly email: string, readonly name: string) {}

  public static async handle(command: CreateEntity, register: Register): Promise<void> {
    const userId: string = getUserId(register)
    await AuthService.setRole(userId, UserRole.Entity).catch((error) => {
      console.log(error)
      throw new Error('Entity not found in Firebase')
    })

    register.events(new EntityCreated(userId, command.email, command.name))
  }
}
