import { S3 } from 'aws-sdk'
import { config } from 'aws-sdk'
import * as dotenv from 'dotenv'

dotenv.config()

config.update({ region: 'eu-west-1' })

export class UploadFileService {
  private static bucket = process.env.S3_BUCKET_NAME
  private static s3 = new S3({ signatureVersion: 'v4' })
  public static getUrlToUploadFile(fileName: string): string {
    const signedUrlExpireSeconds = 60 * 5

    return UploadFileService.s3.getSignedUrl('putObject', {
      Bucket: UploadFileService.bucket,
      Key: fileName,
      Expires: signedUrlExpireSeconds,
    })
  }
}
