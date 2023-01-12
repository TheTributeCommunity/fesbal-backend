import { replace, spy } from 'sinon'
import { BoosterConfig, Register } from '@boostercloud/framework-types'
import { Booster } from '@boostercloud/framework-core'
import * as chai from 'chai'

chai.use(require('sinon-chai'))
chai.use(require('chai-as-promised'))

const expect = chai.expect

const config = new BoosterConfig('test')
config.appName = 'testing-time'
config.providerPackage = '@boostercloud/framework-provider-local'
replace(Booster, 'config', config)

import { CreateRecipientUser } from '../../src/commands/create-recipient-user'

import { RecipientUserCreated } from '../../src/events/recipient-user-created'

const command = new CreateRecipientUser(
  'b813fc41-15e4-495e-81aa-18879beddb48',
  'First Name',
  'Last Name',
  'somePassword',
  '10/03/1996',
  'Calle Falsa, 23, 20333, Madrid, Madrid',
  555444444,
  3
)
const register = new Register('request-id-1', {})
const registerSpy = spy(register, 'events')
const response = async () => {
  await CreateRecipientUser.handle(command, register)
}

expect(response).to.have.been.returned(true)
expect(registerSpy).to.have.been.calledWithExactly(
  new RecipientUserCreated(
    'b813fc41-15e4-495e-81aa-18879beddb48',
    'First Name',
    'Last Name',
    'somePassword',
    '10/03/1996',
    'Calle Falsa, 23, 20333, Madrid, Madrid',
    555444444,
    3
  )
)
