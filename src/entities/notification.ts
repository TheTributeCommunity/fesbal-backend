import { Entity } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Entity
export class Notification {
  public constructor(
    public id: UUID,
    readonly title: string,
    readonly body: string,
    readonly type: string,
    readonly read: boolean = false,
    readonly createdAt: Date,
    readonly readAt?: Date
  ) {}
}
