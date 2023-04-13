import { Entity as EntityDecorator, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { EntityCreated } from '../events/entity/entity-created'

@EntityDecorator
export class Entity {
  public constructor(
    readonly id: UUID,
    readonly entityName: string,
    readonly entityCode: string,
    readonly region: string,
    readonly nextDelivery: string,
    readonly address: string,
    readonly contactPerson: string,
    readonly email: string,
    readonly phone: string,
    readonly storingCapacity: number,
    readonly deleted: boolean = false
  ) {}

  @Reduces(EntityCreated)
  public static reduceEntityCreated(event: EntityCreated, currentEntity?: Entity): Entity {
    if (!currentEntity) {
      return new Entity(
        event.entityId,
        event.entityName,
        event.entityCode,
        event.region,
        '',
        event.address,
        event.contactPerson,
        event.email,
        event.phone,
        event.storingCapacity
      )
    }

    return {
      ...currentEntity,
      entityName: event.entityName,
      entityCode: event.entityCode,
      region: event.region,
      address: event.address,
      contactPerson: event.contactPerson,
      email: event.email,
      phone: event.phone,
      storingCapacity: event.storingCapacity,
    }
  }
}
