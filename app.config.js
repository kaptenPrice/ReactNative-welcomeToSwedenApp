import 'dotenv/config'

export default {
  name: 'KaptenPrize',
  displayName: 'welcomeToSweden',
  expo: {
    name: 'wts',
    slug: 'welcomtetosweden',
    version: '1.0.0',
    platforms: ['web', 'ios'],
    assetBundlePatterns: ['**/*'],
    description: '',
    githubUrl: 'https://github.com/kaptenPrice/ReactNative-welcomeToSwedenApp',
  },
  extra: {enableComments: process.env.WTS_COMMENTS === 'true'}
};
