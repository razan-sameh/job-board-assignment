const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  "@jobboard/shared": __dirname + "/../shared"
};

config.watchFolders = [__dirname + "/../shared"];

module.exports = config;
