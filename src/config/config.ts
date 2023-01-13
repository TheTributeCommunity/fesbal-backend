import { Booster, PublicKeyTokenVerifier } from '@boostercloud/framework-core'
import { BoosterConfig } from '@boostercloud/framework-types'
import * as fs from 'fs'
import * as path from 'path'

function publicKeyResolver(): Promise<string> {
  return Promise.resolve(fs.readFileSync(path.join(__dirname, '..', '..', 'assets', 'certs', 'public.key'), 'utf8'))
}

Booster.configure('local', (config: BoosterConfig): void => {
  config.appName = 'fesbal-backend'
  config.providerPackage = '@boostercloud/framework-provider-local'
  config.tokenVerifiers = [new PublicKeyTokenVerifier('fesbal', publicKeyResolver(), 'role')]
})

Booster.configure('production', (config: BoosterConfig): void => {
  config.appName = 'fesbal-backend'
  config.providerPackage = '@boostercloud/framework-provider-aws'
})
