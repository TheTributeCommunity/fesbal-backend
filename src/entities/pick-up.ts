import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { PickUpStarted } from '../events/pick-up/pick-up-started'
import { PickUpSubmitted } from '../events/pick-up/pick-up-submitted'
import { PickUpSigned } from '../events/pick-up/pick-up-signed'
import { PickUpDeclined } from '../events/pick-up/pick-up-declined'

@Entity
export class PickUp {
  public constructor(
    readonly id: UUID,
    readonly entityId: UUID,
    readonly recipientId: UUID,
    readonly recipientFirstName: string,
    readonly recipientLastName: string,
    readonly recipientIdentityDocumentNumber: string,
    readonly recipientNumberOfRelatives: number,
    readonly startedAt: number,
    readonly submittedAt?: number,
    readonly endedAt?: number,
    readonly signed: boolean = false,
    readonly declined: boolean = false,
    readonly signDate?: number
  ) {}

  static pickUpNotFound = new PickUp('', '', '', '', '', '', 0, 0, 0, 0, false, false, 0)

  @Reduces(PickUpStarted)
  public static reducePickUpStarted(event: PickUpStarted): PickUp {
    return {
      id: event.pickUpId,
      entityId: event.entityId,
      recipientId: event.recipientId,
      recipientFirstName: event.recipientFirstName,
      recipientLastName: event.recipientLastName,
      recipientIdentityDocumentNumber: event.recipientIdentityDocumentNumber,
      recipientNumberOfRelatives: event.recipientNumberOfRelatives,
      startedAt: event.startedAt,
      signed: false,
      declined: false,
    }
  }

  @Reduces(PickUpSubmitted)
  public static reducePickUpSubmitted(event: PickUpSubmitted, currentPickUp: PickUp): PickUp {
    if (!currentPickUp) {
      return PickUp.pickUpNotFound
    }

    return {
      ...currentPickUp,
      submittedAt: event.submittedAt,
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
      declined: true,
      endedAt: event.declinedAt,
    }
  }
}
