module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module:react-native-dotenv", {
        "moduleName": "@env",
        "path": ".env",
        "blacklist": null,
        "whitelist": null,
        "safe": true,
      }],
      ['module-resolver', {
        root: ['./src'],
        extensions: ['.js', '.ts', '.tsx', '.json'],
        alias: {
          "src": "./",
          "assets": "./assets",
          "components": "./src/components",
          "database": "./src/database",
          "navigation": "./src/navigation",
          "screens": "./src/screens",
          "types": "./src/types",
          "utils": "./src/utils"
        }
      }],
    ]
  };
};
