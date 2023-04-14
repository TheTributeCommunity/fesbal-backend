import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'

@Command({
  authorize: 'all', // Specify authorized roles here. Use 'all' to authorize anyone
})
export class DeclinePickUp {
  public constructor(readonly pickUpId: UUID, readonly reason: string, readonly explanation: string) {}

  public static async handle(command: DeclinePickUp, register: Register): Promise<void> {
    register.events(/* YOUR EVENT HERE */)
  }
}
