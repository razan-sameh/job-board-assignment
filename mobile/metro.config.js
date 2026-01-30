const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Only watch the mobile/src folder
config.watchFolders = [path.resolve(__dirname, 'src')];

// Map "src/*" imports to ./src
config.resolver = {
  ...config.resolver,
  extraNodeModules: new Proxy(
    {},
    {
      get: (target, name) => path.join(__dirname, 'src', name),
    }
  ),
};

module.exports = config;
