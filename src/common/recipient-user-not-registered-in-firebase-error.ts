export class RecipientUserNotFoundInFirebaseError extends Error {
  constructor(userId: string) {
    super(`The RecipientUser ${userId} was not found in firebase auth.`)
    this.name = 'RecipientUserNotFoundInFirebaseError'
  }
}
