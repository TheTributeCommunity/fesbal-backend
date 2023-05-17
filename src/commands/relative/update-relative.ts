import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { TypeOfIdentityDocument } from '../../common/type-of-identity-document'
import { RelativeUpdated } from '../../events/relative/relative-updated'

@Command({
  authorize: 'all', // Specify authorized roles here. Use 'all' to authorize anyone
})
export class UpdateRelative {
  public constructor(
    readonly relativeId: UUID,
    readonly firstName?: string,
    readonly lastName?: string,
    readonly dateOfBirth?: number,
    readonly typeOfIdentityDocument?: TypeOfIdentityDocument,
    readonly identityDocumentNumber?: string
  ) {}

  public static async handle(command: UpdateRelative, register: Register): Promise<void> {
    register.events(
      new RelativeUpdated(
        command.relativeId,
        command.firstName,
        command.lastName,
        command.dateOfBirth,
        command.typeOfIdentityDocument,
        command.identityDocumentNumber
      )
    )
  }
}
