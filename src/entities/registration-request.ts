import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { RegistrationRequestSent as RegistrationRequestSent } from '../events/registration-request-sent'
import { RegistrationRequestStatus } from '../common/registration-request-status'

@Entity
export class RegistrationRequest {
  public constructor(
    readonly id: UUID,
    readonly recipientId: UUID,
    readonly status: RegistrationRequestStatus,
    readonly referralSheet?: string,
    readonly socialServiceAppointment?: string
  ) {}

  @Reduces(RegistrationRequestSent)
  public static reduceRegistrationRequestCreated(
    event: RegistrationRequestSent,
    currentRegistrationRequest?: RegistrationRequest
  ): RegistrationRequest {
    if (!currentRegistrationRequest) {
      return new RegistrationRequest(
        event.registrationRequestId,
        event.recipientId,
        RegistrationRequestStatus.Pending,
        event.referralSheet,
        event.socialServiceAppointment
      )
    }

    return {
      ...currentRegistrationRequest,
      status: RegistrationRequestStatus.Pending,
      referralSheet: event.referralSheet,
      socialServiceAppointment: event.socialServiceAppointment,
    }
  }
}
