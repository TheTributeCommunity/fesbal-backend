import { Register, UserEnvelope } from '@boostercloud/framework-types'

export const getUserId = (register: Register): string => {
  const id = register.currentUser?.id

  if (!id) {
    throw new Error('User id is undefined')
  }

  return id
}

export const getEnvelopeUserId = (envelope: UserEnvelope | undefined): string => {
  const id = envelope?.id

  if (!id) {
    throw new Error('User id is undefined')
  }

  return id
}
