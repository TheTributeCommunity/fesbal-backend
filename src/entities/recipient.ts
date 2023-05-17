import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { RecipientCreated } from '../events/recipient/recipient-created'
import { TypeOfIdentityDocument } from '../common/type-of-identity-document'
import { RecipientEmailUpdated } from '../events/recipient/recipient-email-updated'
import { RecipientUserDeleted } from '../events/recipient/recipient-user-deleted'
import { RecipientAddedReferralSheet } from '../events/recipient/recipient-added-referral-sheet'
import { RelativeAddedToRecipientUser } from '../events/relative/relative-added-to-recipient-user'
import { SignRequested } from '../events/pick-up/sign-requested'
import { RecipientPickUpDone } from '../events/pick-up/recipient-pick-up-done'
import { RecipientUpdated } from '../events/recipient/recipient-updated'
import { RecipientNotified } from '../events/notification/recipient-notified'
import { RelativeDeletedFromRecipient } from '../events/relative/relative-deleted-from-recipient'

@Entity
export class Recipient {
  public constructor(
    readonly id: UUID,
    readonly firstName: string,
    readonly lastName: string,
    readonly dateOfBirth: number,
    readonly typeOfIdentityDocument: TypeOfIdentityDocument,
    readonly identityDocumentNumber: string,
    readonly phone: string,
    readonly phoneVerified: boolean = true,
    readonly email?: string,
    readonly relativesIds: UUID[] = [],
    readonly referralSheetsIds: UUID[] = [],
    readonly isDeleted: boolean = false,
    readonly entityId?: UUID,
    readonly pickUpsIds: UUID[] = [],
    readonly notificationsIds: UUID[] = [],
    readonly pendingSignsId: UUID[] = []
  ) {}

  private static createEmpty(): Recipient {
    return new Recipient(
      new UUID(0),
      '',
      '',
      0,
      TypeOfIdentityDocument.DNI,
      '',
      '0',
      false,
      '',
      [],
      [],
      false,
      undefined
    )
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
        event.phone,
        true,
        event.email,
        [],
        [],
        false,
        undefined
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
      email: event.email,
    }
  }

  @Reduces(RecipientUpdated)
  public static reduceRecipientUpdated(event: RecipientUpdated, currentRecipient?: Recipient): Recipient {
    if (!currentRecipient) {
      return Recipient.createEmpty()
    }

    return {
      ...currentRecipient,
      firstName: event.firstName ?? currentRecipient.firstName,
      lastName: event.lastName ?? currentRecipient.lastName,
      dateOfBirth: event.dateOfBirth ?? currentRecipient.dateOfBirth,
      typeOfIdentityDocument: event.typeOfIdentityDocument ?? currentRecipient.typeOfIdentityDocument,
      identityDocumentNumber: event.identityDocumentNumber ?? currentRecipient.identityDocumentNumber,
      phone: event.phone ?? currentRecipient.phone,
      email: event.email ?? currentRecipient.email,
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
      isDeleted: true,
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

  @Reduces(RelativeDeletedFromRecipient)
  public static reduceRelativeDeletedFromRecipientUser(
    event: RelativeDeletedFromRecipient,
    currentRecipientUser?: Recipient
  ): Recipient {
    if (!currentRecipientUser) {
      return Recipient.createEmpty()
    }
    let relativesIds = currentRecipientUser.relativesIds ?? []

    if (relativesIds.includes(event.relativeId)) {
      relativesIds = relativesIds.filter((id) => id !== event.relativeId)
    }

    return {
      ...currentRecipientUser,
      relativesIds: relativesIds,
    }
  }

  @Reduces(SignRequested)
  public static reducesSignRequested(event: SignRequested, currentRecipientUser?: Recipient): Recipient {
    if (!currentRecipientUser) {
      return Recipient.createEmpty()
    }

    return {
      ...currentRecipientUser,
      pendingSignsId: [...currentRecipientUser.pendingSignsId, event.pickUpId],
    }
  }

  @Reduces(RecipientPickUpDone)
  public static reducesPickUpAddedToRecipient(event: RecipientPickUpDone, currentRecipientUser?: Recipient): Recipient {
    if (!currentRecipientUser) {
      return Recipient.createEmpty()
    }

    const pendingSignsId = currentRecipientUser.pendingSignsId ?? []

    if (pendingSignsId.includes(event.pickUpId)) {
      pendingSignsId.splice(pendingSignsId.indexOf(event.pickUpId), 1)
    }

    return {
      ...currentRecipientUser,
      pickUpsIds: [...currentRecipientUser.pickUpsIds, event.pickUpId],
      pendingSignsId: pendingSignsId,
    }
  }

  @Reduces(RecipientAddedReferralSheet)
  public static reducesRecipientAddedReferralSheet(
    event: RecipientAddedReferralSheet,
    currentRecipient?: Recipient
  ): Recipient {
    if (!currentRecipient) {
      return Recipient.createEmpty()
    }

    return {
      ...currentRecipient,
      referralSheetsIds: [...currentRecipient.referralSheetsIds, event.referralSheetId],
      entityId: event.entityId,
    }
  }

  @Reduces(RecipientNotified)
  public static reducesRecipientNotified(event: RecipientNotified, currentRecipient?: Recipient): Recipient {
    if (!currentRecipient) {
      return Recipient.createEmpty()
    }

    return {
      ...currentRecipient,
      notificationsIds: [...currentRecipient.notificationsIds, event.notificationId],
    }
  }
}
