import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { NewNotification } from '../events/notification/new-notification'

@Entity
export class Notification {
  public constructor(
    public id: UUID,
    readonly userId: UUID,
    readonly title: string,
    readonly body: string,
    readonly read: boolean = false,
    readonly createdAt: Date,
    readonly readAt?: Date,
    readonly isDeleted: boolean = false
  ) {}

  @Reduces(NewNotification)
  public static reduceNewNotification(event: NewNotification): Notification {
    return {
      id: event.id,
      userId: event.userId,
      title: event.title,
      body: event.body,
      read: false,
      createdAt: event.createdAt,
      isDeleted: false,
    }
  }
}
