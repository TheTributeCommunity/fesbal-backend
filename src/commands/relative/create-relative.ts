import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { TypeOfIdentityDocument } from '../../common/type-of-identity-document'
import { RelativeCreated } from '../../events/relative/relative-created'
import { RelativeAddedToRecipientUser } from '../../events/relative/relative-added-to-recipient-user'

@Command({
  authorize: 'all',
})
export class CreateRelative {
  public constructor(
    readonly relativeId: UUID,
    readonly recipientUserId: UUID,
    readonly firstName: string,
    readonly lastName: string,
    readonly dateOfBirth: string,
    readonly typeOfIdentityDocument?: TypeOfIdentityDocument,
    readonly identityDocumentNumber?: string
  ) {}

  public static async handle(command: CreateRelative, register: Register): Promise<void> {
    if (this.getAge(command.dateOfBirth) < 18 && !command.typeOfIdentityDocument) {
      throw new Error('If you are above 18 years old, you must register a identity document number')
    }

    register.events(
      new RelativeCreated(
        command.relativeId,
        command.recipientUserId,
        command.firstName,
        command.lastName,
        command.dateOfBirth,
        command.typeOfIdentityDocument,
        command.identityDocumentNumber
      )
    )
    register.events(new RelativeAddedToRecipientUser(command.recipientUserId, command.relativeId))
    await register.flush()
  }

  private static getAge = (birthDate: string): number =>
    Math.floor((new Date().getTime() - new Date(birthDate).getTime()) / 3.15576e10)
}
