import { getAuth } from 'firebase-admin/auth'
import { RecipientUserRole } from '../common/recipient-user-role'

export class AuthService {
  public static setUserRegisteredRole(userId: string | undefined | unknown) {
    if (typeof userId === 'string') {
      void this.setRole(userId, RecipientUserRole.UserRegistered)
    }
  }
  public static setUserPendingRole(userId: string | undefined | unknown) {
    if (typeof userId === 'string') {
      void this.setRole(userId, RecipientUserRole.UserPending)
    }
  }
  private static async setRole(userId: string, role: string) {
    return await getAuth().setCustomUserClaims(userId, { role: role })
  }
}
