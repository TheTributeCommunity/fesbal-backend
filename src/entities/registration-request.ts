import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { RegistrationRequestSent as RegistrationRequestSent } from '../events/registration-request-sent'
import { RegistrationRequestStatus } from '../common/registration-request-status'

@Entity
export class RegistrationRequest {
  public constructor(
    readonly id: UUID,
    readonly recipientId: UUID,
    readonly referralSheet?: string,
    readonly socialServiceAppointment?: string,
    readonly status: RegistrationRequestStatus = RegistrationRequestStatus.Pending
  ) {}

  @Reduces(RegistrationRequestSent)
  public static reduceRegistrationRequestCreated(
    event: RegistrationRequestSent,
    currentRegistrationRequest?: RegistrationRequest
  ): RegistrationRequest {
    return new RegistrationRequest(
      event.registrationRequestId,
      event.recipientId,
      event.referralSheet,
      event.socialServiceAppointment
    )
  }
}
