import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { RecipientCreated } from '../events/recipient/recipient-created'
import { TypeOfIdentityDocument } from '../common/type-of-identity-document'
import { RecipientEmailUpdated } from '../events/recipient/recipient-email-updated'
import { RecipientUserDeleted } from '../events/recipient/recipient-user-deleted'
import { RecipientUserReferralSheetUrlUpdated } from '../events/recipient/recipient-referral-sheet-url-updated'
import { RecipientUpdated } from '../events/recipient/recipient-updated'
import { RelativeAddedToRecipientUser } from '../events/relative/relative-added-to-recipient-user'
import { RelativeDeletedFromRecipient } from '../events/relative/relative-deleted-from-recipient'

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
    readonly relativesIds?: UUID[],
    readonly referralSheetUrl?: string,
    readonly deleted: boolean = false
  ) {}

  private static createEmpty(): Recipient {
    return new Recipient(new UUID(0), '', '', '', TypeOfIdentityDocument.DNI, '', '0', false, '', [], '', true)
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

  @Reduces(RelativeDeletedFromRecipient)
  public static reduceRelativeDeletedFromRecipient(
    event: RelativeDeletedFromRecipient,
    currentRecipientUser?: Recipient
  ): Recipient {
    if (!currentRecipientUser) {
      return Recipient.createEmpty()
    }

    const relativesIds = currentRecipientUser.relativesIds ?? []
    const relativeIndex = relativesIds.indexOf(event.relativeId)

    if (relativeIndex > -1) {
      relativesIds.splice(relativeIndex, 1)
    }

    return {
      ...currentRecipientUser,
      relativesIds: relativesIds,
    }
  }
}
