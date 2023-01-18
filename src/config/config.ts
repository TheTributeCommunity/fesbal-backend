import { Booster, JwksUriTokenVerifier, PublicKeyTokenVerifier } from '@boostercloud/framework-core'
import { BoosterConfig } from '@boostercloud/framework-types'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'
import { AuthService } from '../services/auth-service'
import { UploadFileService } from '../services/upload-file-service'

function publicKeyResolver(): Promise<string> {
  return Promise.resolve(fs.readFileSync(path.join(__dirname, '..', '..', 'assets', 'certs', 'public.key'), 'utf8'))
}

Booster.configure('local', (config: BoosterConfig): void => {
  dotenv.config()

  UploadFileService.initialize()

  config.appName = 'fesbal-backend-local'
  config.providerPackage = '@boostercloud/framework-provider-local'
  config.tokenVerifiers = [new PublicKeyTokenVerifier('fesbal', publicKeyResolver(), 'role')]
})

Booster.configure('development', (config: BoosterConfig): void => {
  dotenv.config()

  AuthService.initialize()
  UploadFileService.initialize()

  config.appName = 'fesbal-backend-dev'
  config.providerPackage = '@boostercloud/framework-provider-aws'
  config.tokenVerifiers = [
    new JwksUriTokenVerifier(
      `https://securetoken.google.com/${AuthService.projectId}`,
      'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com',
      'role'
    ),
  ]
})
