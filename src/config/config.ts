import { Booster, JwksUriTokenVerifier } from '@boostercloud/framework-core'
import { BoosterConfig } from '@boostercloud/framework-types'
import * as dotenv from 'dotenv'
import { AuthService } from '../services/auth-service'
import { RocketFilesUserConfiguration } from '@boostercloud/rocket-file-uploads-types'
import { BoosterRocketFiles } from '@boostercloud/rocket-file-uploads-core'
import { ConfigConstants, RocketFilesConfigurationDefault } from '../common/config-constants'

const rocketFilesConfigurationDefault: RocketFilesUserConfiguration = {
  storageName: RocketFilesConfigurationDefault.storageName, // AWS S3 bucket name
  containerName: '', // Not used in AWS
  directories: RocketFilesConfigurationDefault.directories, // Root directories for your files
}

Booster.configure(ConfigConstants.environment.local, (config: BoosterConfig): void => {
  dotenv.config()

  AuthService.initialize()

  config.appName = `${ConfigConstants.appName}-local`
  config.providerPackage = '@boostercloud/framework-provider-local'
  config.tokenVerifiers = [
    new JwksUriTokenVerifier(
      `https://securetoken.google.com/${AuthService.projectId}`,
      'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com',
      'role'
    ),
  ]
  config.rockets = [new BoosterRocketFiles(config, [rocketFilesConfigurationDefault]).rocketForLocal()]
})

Booster.configure(ConfigConstants.environment.development, (config: BoosterConfig): void => {
  dotenv.config()

  AuthService.initialize()

  config.assets = ['.env']
  config.appName = `${ConfigConstants.appName}-dev`
  config.providerPackage = '@boostercloud/framework-provider-aws'
  config.tokenVerifiers = [
    new JwksUriTokenVerifier(
      `https://securetoken.google.com/${AuthService.projectId}`,
      'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com',
      'role'
    ),
  ]
  config.rockets = [new BoosterRocketFiles(config, [rocketFilesConfigurationDefault]).rocketForAWS()]
})
