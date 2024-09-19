const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

module.exports = (() => {
  // Get the default Metro configuration
  const config = getDefaultConfig(__dirname);

  // Destructure transformer and resolver from the config
  const { transformer, resolver } = config;

  // Customize the transformer to use react-native-svg-transformer
  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
  };

  // Customize the resolver to handle .svg files as source files
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"), // Remove .svg from assetExts
    sourceExts: [...resolver.sourceExts, "svg"], // Add .svg to sourceExts
  };

  // Wrap the configuration with NativeWind for Tailwind CSS support
  return withNativeWind(config, { input: "./global.css" }); // Define your Tailwind CSS config file (global.css or other)
})();
