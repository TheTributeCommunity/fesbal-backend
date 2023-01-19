import { Command } from '@boostercloud/framework-core'
import { Register } from '@boostercloud/framework-types'
import { UserRegistered } from '../common/roles'
import { UploadFileService } from '../services/upload-file-service'

@Command({
  authorize: [UserRegistered],
})
export class GetUploadReferralSheetUrl {
  public constructor(readonly fileName: string) {}

  public static async handle(command: GetUploadReferralSheetUrl, register: Register): Promise<string> {
    return UploadFileService.getUrlToUploadFile(command.fileName)
  }
}
