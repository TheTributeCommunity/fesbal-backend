import { Booster, Command } from '@boostercloud/framework-core'
import { NotificationRead } from '../../events/notification/notification-read'
import { Notification } from '../../entities/notification'
import { Register, UUID } from '@boostercloud/framework-types'

@Command({
  authorize: 'all', // Specify authorized roles here. Use 'all' to authorize anyone
})
export class ReadNotification {
  public constructor(readonly notificationId: UUID) {}

  public static async handle(command: ReadNotification, register: Register): Promise<void> {
    const notification = await Booster.entity(Notification, command.notificationId)

    if (!notification) {
      throw new Error('Notification not found')
    }

    register.events(new NotificationRead(command.notificationId, new Date()))
  }
}
