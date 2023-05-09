import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { NewNotification } from '../events/notification/new-notification'
import { NotificationRead } from '../events/notification/notification-read'

@Entity
export class Notification {
  public constructor(
    public id: UUID,
    readonly userId: UUID,
    readonly title: string,
    readonly body: string,
    readonly read: boolean = false,
    readonly createdAt: number,
    readonly readAt?: number,
    readonly isDeleted: boolean = false
  ) {}

  static notificationNotFound = new Notification(new UUID(0), new UUID(0), '', '', false, 0, 0, true)

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

  @Reduces(NotificationRead)
  public static reduceNotificationRead(event: NotificationRead, currentNotification?: Notification): Notification {
    if (!currentNotification) {
      return Notification.notificationNotFound
    }

    return {
      ...currentNotification,
      read: true,
      readAt: event.readAt,
    }
  }
}
