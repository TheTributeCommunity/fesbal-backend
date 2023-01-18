import { UUID } from '@boostercloud/framework-types'

export class RecipientUserNotFoundError extends Error {
  constructor(recipientUserId: UUID) {
    super(`The RecipientUser ${recipientUserId} was not found.`)
    this.name = 'RecipientUserNotFoundError'
  }
}
