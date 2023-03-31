import { RoleInterface } from '@boostercloud/framework-types'
import { cert, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

export class AuthService {
  static projectId?: string
  private static privateKey?: string
  private static clientEmail?: string
  private static databaseURL?: string

  public static initialize(): void {
    AuthService.projectId = process.env.FIREBASE_PROJECT_ID
    AuthService.privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    AuthService.clientEmail = process.env.FIREBASE_CLIENT_EMAIL
    AuthService.databaseURL = process.env.FIREBASE_DATABASE_URL

    initializeApp({
      credential: cert({
        projectId: AuthService.projectId,
        clientEmail: AuthService.clientEmail,
        privateKey: AuthService.privateKey,
      }),
      databaseURL: AuthService.databaseURL,
    })
  }

  public static async setRole(userId: string, role: RoleInterface): Promise<void> {
    if (this.projectId) {
      return await getAuth().setCustomUserClaims(userId, { role: role })
    }
  }
}
