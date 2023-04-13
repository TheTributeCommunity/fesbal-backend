import { Projects, ReadModel } from '@boostercloud/framework-core'
import { ProjectionResult, ReadModelAction, UUID } from '@boostercloud/framework-types'
import { Entity } from '../entities/entity'

@ReadModel({
  authorize: 'all',
})
export class EntityReadModel {
  public constructor(
    public id: UUID,
    readonly entityName: string,
    readonly entityCode: string,
    readonly region: string,
    readonly nextDelivery: string,
    readonly address: string,
    readonly contactPerson: string,
    readonly email: string,
    readonly phone: string,
    readonly storingCapacity: number,
    readonly deleted?: boolean
  ) {}

  @Projects(Entity, 'id')
  public static projectEntity(entity: Entity): ProjectionResult<EntityReadModel> {
    if (entity.deleted == true) {
      return ReadModelAction.Delete
    }

    return new EntityReadModel(
      entity.id,
      entity.entityName,
      entity.entityCode,
      entity.region,
      entity.nextDelivery,
      entity.address,
      entity.contactPerson,
      entity.email,
      entity.phone,
      entity.storingCapacity
    )
  }
}
