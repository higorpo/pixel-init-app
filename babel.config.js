module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-nullish-coalescing-operator',
      [
        'babel-plugin-root-import',
        {
          "paths": [
            {
              "rootPathSuffix": "./src",
              "rootPathPrefix": "~/"
            },
            {
              "rootPathSuffix": "./assets",
              "rootPathPrefix": "assets/"
            },
          ]
        }
      ]
    ]
  };
};
