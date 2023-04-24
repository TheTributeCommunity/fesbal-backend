import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class NewNotification {
  public constructor(
    readonly id: UUID,
    readonly userId: UUID,
    readonly title: string,
    readonly body: string,
    readonly read: boolean = false,
    readonly createdAt: Date,
    readonly readAt?: Date,
    readonly isDeleted: boolean = false
  ) {}

  public entityID(): UUID {
    return this.id
  }
}
