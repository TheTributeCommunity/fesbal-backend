import { UUID } from '@boostercloud/framework-types'

export class RecipientUserNotFoundInFirebaseError extends Error {
  constructor(recipientUserId: UUID) {
    super(`The RecipientUser ${recipientUserId} was not found in firebase auth.`)
    this.name = 'RecipientUserNotFoundInFirebaseError'
  }
}
