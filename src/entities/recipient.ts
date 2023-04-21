import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { RecipientCreated } from '../events/recipient/recipient-created'
import { TypeOfIdentityDocument } from '../common/type-of-identity-document'
import { RecipientEmailUpdated } from '../events/recipient/recipient-email-updated'
import { RecipientUserDeleted } from '../events/recipient/recipient-user-deleted'
import { RecipientUserReferralSheetUrlUpdated } from '../events/recipient/recipient-referral-sheet-url-updated'
import { RelativeAddedToRecipientUser } from '../events/recipient/relative-added-to-recipient-user'
import { Entity as FesbalEntity } from './entity'
import { Notification } from './notification'
import { SignRequested } from '../events/pick-up/sign-requested'
import { RecipientPickUpDone } from '../events/pick-up/recipient-pick-up-done'

@Entity
export class Recipient {
  public constructor(
    readonly id: UUID,
    readonly firstName: string,
    readonly lastName: string,
    readonly dateOfBirth: string,
    readonly typeOfIdentityDocument: TypeOfIdentityDocument,
    readonly identityDocumentNumber: string,
    readonly phone: string,
    readonly phoneVerified: boolean = true,
    readonly email?: string,
    readonly relativesIds?: Array<UUID>,
    readonly referralSheetUrl?: string,
    readonly deleted: boolean = false,
    readonly entity?: FesbalEntity,
    readonly pickUps: UUID[] = [],
    readonly lastPickUp?: UUID,
    readonly notifications: Notification[] = [],
    readonly pendingSign: UUID[] = []
  ) {}

  private static createEmpty(): Recipient {
    return new Recipient(UUID.generate(), '', '', '', TypeOfIdentityDocument.DNI, '', '0', false, '', [], '', true)
  }

  @Reduces(RecipientCreated)
  public static reduceRecipientCreated(event: RecipientCreated, currentRecipient?: Recipient): Recipient {
    if (!currentRecipient) {
      return new Recipient(
        event.recipientId,
        event.firstName,
        event.lastName,
        event.dateOfBirth,
        event.typeOfIdentityDocument,
        event.identityDocumentNumber,
        event.phone
      )
    }

    return {
      ...currentRecipient,
      firstName: event.firstName,
      lastName: event.lastName,
      dateOfBirth: event.dateOfBirth,
      typeOfIdentityDocument: event.typeOfIdentityDocument,
      identityDocumentNumber: event.identityDocumentNumber,
      phone: event.phone,
    }
  }

  @Reduces(RecipientEmailUpdated)
  public static reduceRecipientEmailUpdated(event: RecipientEmailUpdated, currentRecipient?: Recipient): Recipient {
    if (!currentRecipient) {
      return Recipient.createEmpty()
    }

    return {
      ...currentRecipient,
      email: event.email,
    }
  }

  @Reduces(RecipientUserDeleted)
  public static reduceRecipientUserDeleted(event: RecipientUserDeleted, currentRecipientUser?: Recipient): Recipient {
    if (!currentRecipientUser) {
      return Recipient.createEmpty()
    }

    return {
      ...currentRecipientUser,
      deleted: true,
    }
  }

  @Reduces(RelativeAddedToRecipientUser)
  public static reduceRelativeAddedToRecipientUser(
    event: RelativeAddedToRecipientUser,
    currentRecipientUser?: Recipient
  ): Recipient {
    if (!currentRecipientUser) {
      return Recipient.createEmpty()
    }
    const relativesIds = currentRecipientUser.relativesIds ?? []

    if (!relativesIds.includes(event.relativeId)) {
      relativesIds.push(event.relativeId)
    }

    return {
      ...currentRecipientUser,
      relativesIds: relativesIds,
    }
  }

  @Reduces(RecipientUserReferralSheetUrlUpdated)
  public static reduceRecipientUserReferralSheetUpdated(
    event: RecipientUserReferralSheetUrlUpdated,
    currentRecipientUser?: Recipient
  ): Recipient {
    if (!currentRecipientUser) {
      return Recipient.createEmpty()
    }

    return {
      ...currentRecipientUser,
      referralSheetUrl: event.referralSheetUrl,
    }
  }

  @Reduces(SignRequested)
  public static reducesSignRequested(event: SignRequested, currentRecipientUser?: Recipient): Recipient {
    if (!currentRecipientUser) {
      return Recipient.createEmpty()
    }

    return {
      ...currentRecipientUser,
      pendingSign: [...currentRecipientUser.pendingSign, event.pickUpId],
    }
  }

  @Reduces(RecipientPickUpDone)
  public static reducesPickUpAddedToRecipient(event: RecipientPickUpDone, currentRecipientUser?: Recipient): Recipient {
    if (!currentRecipientUser) {
      return Recipient.createEmpty()
    }

    return {
      ...currentRecipientUser,
      pickUps: [...currentRecipientUser.pickUps, event.pickUpId],
      lastPickUp: event.pickUpId,
    }
  }
}
