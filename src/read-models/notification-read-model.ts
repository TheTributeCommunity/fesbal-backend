import { Projects, ReadModel } from '@boostercloud/framework-core'
import { ProjectionResult, ReadModelAction, UUID } from '@boostercloud/framework-types'
import { Notification } from '../entities/notification'

@ReadModel({
  authorize: 'all',
})
export class NotificationReadModel {
  public constructor(
    public id: UUID,
    readonly title: string,
    readonly body: string,
    readonly read: boolean,
    readonly createdAt: Date,
    readonly readAt: Date | undefined,
    readonly isDeleted: boolean
  ) {}

  @Projects(Notification, 'id')
  public static projectNotification(notification: Notification): ProjectionResult<NotificationReadModel> {
    if (notification.isDeleted == true) {
      return ReadModelAction.Delete
    }
    return new NotificationReadModel(
      notification.id,
      notification.title,
      notification.body,
      notification.read,
      notification.createdAt,
      notification.readAt,
      notification.isDeleted
    )
  }
}
