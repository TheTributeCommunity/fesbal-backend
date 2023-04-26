import { Booster, Projects, ReadModel } from '@boostercloud/framework-core'
import { ProjectionResult, ReadModelAction, UUID } from '@boostercloud/framework-types'
import { Entity } from '../entities/entity'
import { NotificationReadModel } from './notification-read-model'
import { PickUpReadModel } from './pick-up-read-model'

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
    private deliveriesIds: UUID[],
    private notificationsIds: UUID[],
    readonly deleted: boolean | false
  ) {}

  public get notifications(): Promise<NotificationReadModel[] | undefined> {
    return Booster.readModel(NotificationReadModel)
      .filter({ id: { in: this.notificationsIds ?? [] } })
      .search() as Promise<NotificationReadModel[]>
  }

  public get deliveries(): Promise<PickUpReadModel[] | undefined> {
    return Booster.readModel(PickUpReadModel)
      .filter({ id: { in: this.deliveriesIds ?? [] } })
      .search() as Promise<PickUpReadModel[]>
  }

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
      entity.storingCapacity,
      entity.deliveriesIds,
      entity.notificationsIds,
      entity.deleted
    )
  }
}
