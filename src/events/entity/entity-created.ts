import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class EntityCreated {
  public constructor(
    readonly entityId: UUID,
    readonly entityName: string,
    readonly entityCode: string,
    readonly region: string,
    readonly address: string,
    readonly contactPerson: string,
    readonly email: string,
    readonly phone: string,
    readonly firstPassword: string,
    readonly storingCapacity: number,
    readonly hasFridge: boolean,
    readonly hasFreezer: boolean
  ) {}

  public entityID(): UUID {
    return this.entityId
  }
}
