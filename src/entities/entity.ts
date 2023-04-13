import { Entity as boosterEntity } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@boosterEntity
export class Entity {
  public constructor(
    readonly id: UUID,
    readonly name: string,
    readonly email: string,
    readonly deleted: boolean = false
  ) {}
}
