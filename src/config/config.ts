import { Booster, JwksUriTokenVerifier, PublicKeyTokenVerifier } from '@boostercloud/framework-core'
import { BoosterConfig } from '@boostercloud/framework-types'
import * as fs from 'fs'
import * as path from 'path'
import { firebaseConfigData } from './firebase-config-data'

function publicKeyResolver(): Promise<string> {
  return Promise.resolve(fs.readFileSync(path.join(__dirname, '..', '..', 'assets', 'certs', 'public.key'), 'utf8'))
}

Booster.configure('local', (config: BoosterConfig): void => {
  config.appName = 'fesbal-backend-local'
  config.providerPackage = '@boostercloud/framework-provider-local'
  config.tokenVerifiers = [new PublicKeyTokenVerifier('fesbal', publicKeyResolver(), 'role')]
})

Booster.configure('development', (config: BoosterConfig): void => {
  config.appName = 'fesbal-backend-dev'
  config.providerPackage = '@boostercloud/framework-provider-aws'
  config.tokenVerifiers = [
    new JwksUriTokenVerifier(
      `https://securetoken.google.com/${firebaseConfigData.projectId}`,
      'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com',
      'role'
    ),
  ]
})
