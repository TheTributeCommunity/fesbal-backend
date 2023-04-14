import { SESClient, SendEmailCommand, SendEmailResponse } from '@aws-sdk/client-ses'

export interface EmailRequest {
  to: string
  from: string
  subject: string
  body: string
}

export class EmailService {
  private static client: SESClient
  private static CHARSET_UTF8 = 'UTF-8'

  public static initialize(): void {
    this.client = new SESClient({
      region: process.env.AWS_REGION,
    })
  }

  public static async send(request: EmailRequest): Promise<string> {
    const email: SendEmailCommand = new SendEmailCommand({
      Destination: {
        ToAddresses: [request.to],
      },
      Message: {
        Body: {
          Html: {
            Charset: this.CHARSET_UTF8,
            Data: request.body,
          },
        },
        Subject: {
          Charset: this.CHARSET_UTF8,
          Data: request.subject,
        },
      },
      Source: request.from,
    })

    try {
      const response: SendEmailResponse = await this.client.send(email)
      return response.MessageId ?? ''
    } catch (error) {
      console.error(error)
      return ''
    }
  }
}
