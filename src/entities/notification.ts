import { Entity } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

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
}
