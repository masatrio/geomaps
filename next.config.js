module.exports = {
    webpack: (config, { isServer }) => {
      config.module.rules.push({
        test: /\.geojson$/,
        use: 'json-loader',
        type: 'javascript/auto',
      });
  
      return config;
    },
  };