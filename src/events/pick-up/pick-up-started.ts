import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class PickUpStarted {
  public constructor(
    readonly pickUpId: UUID,
    readonly entityId: UUID,
    readonly recipientId: UUID,
    readonly recipientFirstName: string,
    readonly recipientLastName: string,
    readonly recipientIdentityDocumentNumber: string,
    readonly recipientNumberOfRelatives: number,
    readonly startedAt: number
  ) {}

  public entityID(): UUID {
    return this.pickUpId
  }
}
