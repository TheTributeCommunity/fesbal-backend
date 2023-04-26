import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class NotificationRead {
  public constructor(readonly notificationId: UUID, readonly readAt: number) {}

  public entityID(): UUID {
    return this.notificationId
  }
}
