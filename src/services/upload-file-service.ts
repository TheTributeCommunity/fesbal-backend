import { S3 } from 'aws-sdk'
import { config } from 'aws-sdk'

export class UploadFileService {
  private static bucket?: string
  private static s3: S3

  public static initialize(): void {
    config.update({ region: process.env.S3_BUCKET_REGION })
    UploadFileService.bucket = process.env.S3_BUCKET_NAME
    UploadFileService.s3 = new S3({ signatureVersion: 'v4' })
  }

  public static getUrlToUploadFile(fileName: string): string {
    const signedUrlExpireSeconds = 60 * 5

    return UploadFileService.s3.getSignedUrl('putObject', {
      Bucket: UploadFileService.bucket,
      Key: fileName,
      Expires: signedUrlExpireSeconds,
    })
  }
}
