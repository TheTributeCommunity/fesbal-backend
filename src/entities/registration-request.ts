import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { RegistrationRequestCreated } from '../events/registration-request-created'
import { RegistrationRequestStatus } from '../common/registration-request-status'

@Entity
export class RegistrationRequest {
  public constructor(
    readonly id: UUID,
    readonly recipientUserId: UUID,
    readonly referralSheetPending: boolean,
    readonly referralSheetSocialSecurityDate?: string,
    readonly status: RegistrationRequestStatus = RegistrationRequestStatus.Pending
  ) {}

  @Reduces(RegistrationRequestCreated)
  public static reduceRegistrationRequestCreated(
    event: RegistrationRequestCreated,
    currentRegistrationRequest?: RegistrationRequest
  ): RegistrationRequest {
    return new RegistrationRequest(
      event.registrationRequestId,
      event.recipientUserId,
      event.referralSheetPending,
      event.referralSheetSocialSecurityDate
    )
  }
}
