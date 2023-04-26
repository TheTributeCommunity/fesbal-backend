import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { PickUpStarted } from '../events/pick-up/pick-up-started'
import { PickUpSubmitted } from '../events/pick-up/pick-up-submitted'
import { PickUpSigned } from '../events/pick-up/pick-up-signed'
import { PickUpDeclined } from '../events/pick-up/pick-up-declined'

@Entity
export class PickUp {
  public constructor(
    public id: UUID,
    readonly receiptId: UUID,
    readonly entityId: UUID,
    readonly items: string[],
    readonly startedAt: Date,
    readonly endedAt?: Date,
    readonly signed: boolean = false,
    readonly signDate?: Date
  ) {}

  static pickUpNotFound = new PickUp('', '', '', [], new Date())

  @Reduces(PickUpStarted)
  public static reducePickUpStarted(event: PickUpStarted): PickUp {
    return {
      id: event.pickUpId,
      receiptId: event.receiptId,
      entityId: event.entityId,
      items: [],
      startedAt: event.startedAt,
      signed: false,
    }
  }

  @Reduces(PickUpSubmitted)
  public static reducePickUpSubmitted(event: PickUpSubmitted, currentPickUp: PickUp): PickUp {
    if (!currentPickUp) {
      return PickUp.pickUpNotFound
    }

    return {
      ...currentPickUp,
      items: event.items,
    }
  }

  @Reduces(PickUpSigned)
  public static reducePickUpSigned(event: PickUpSigned, currentPickUp: PickUp): PickUp {
    if (!currentPickUp) {
      return PickUp.pickUpNotFound
    }

    return {
      ...currentPickUp,
      signed: true,
      signDate: event.signDate,
      endedAt: event.signDate,
    }
  }

  @Reduces(PickUpDeclined)
  public static reducePickUpDeclined(event: PickUpDeclined, currentPickUp: PickUp): PickUp {
    if (!currentPickUp) {
      return PickUp.pickUpNotFound
    }

    return {
      ...currentPickUp,
      signed: false,
      endedAt: event.declinedAt,
    }
  }
}
