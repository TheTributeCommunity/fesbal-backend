import { SESV2 } from 'aws-sdk'
import { SendEmailRequest, SendEmailResponse } from 'aws-sdk/clients/sesv2'

export interface EmailRequest {
  to: string
  from: string
  subject: string
  body: string
}

export class EmailService {
  private static ses: SESV2
  private static CHARSET_UTF8 = 'UTF-8'

  public static initialize(): void {
    this.ses = new SESV2({
      region: process.env.AWS_REGION,
    })
  }

  public static async send(request: EmailRequest): Promise<string> {
    const params: SendEmailRequest = {
      Destination: {
        ToAddresses: [request.to],
      },
      Content: {
        Simple: {
          Body: {
            Html: {
              Data: request.body,
              Charset: this.CHARSET_UTF8,
            },
          },
          Subject: {
            Data: request.subject,
            Charset: this.CHARSET_UTF8,
          },
        },
      },
      FromEmailAddress: request.from,
    }

    const response: SendEmailResponse = await this.ses.sendEmail(params).promise()

    return response.MessageId ?? ''
  }
}
