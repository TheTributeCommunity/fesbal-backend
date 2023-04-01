import { RocketFilesUserConfiguration } from '@boostercloud/rocket-file-uploads-types'

export const ConfigConstants = {
  appName: 'fesbal-backend',
  environment: {
    local: 'local',
    development: 'development',
    production: 'production',
  },
}

export const RocketFilesConfigurationDefault: RocketFilesUserConfiguration = {
  storageName: 'fesbalst',
  containerName: '', // Not needed in AWS.
  directories: ['derivations'],
}
