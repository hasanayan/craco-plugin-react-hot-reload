module.exports = {
  overrideWebpackConfig: ({
    webpackConfig,
    pluginOptions,
    context: {
      env
    }
  }) => {
    if (env === "production") {
      return webpackConfig;
    }

    const conf = { ...webpackConfig };

    if (!conf || !conf.module || !conf.module.rules) {
      return webpackConfig;
    }

    const condition = u => typeof u === 'object' && u.loader && u.loader.includes('eslint-loader');
    const rule = conf.module.rules.find(rule => rule.use && rule.use.some(condition));

    if (rule) {
      const use = rule.use.find(condition);
      if (use) {
        use.options.emitWarning = true;
      }
    }

    return {
      ...conf,
      resolve: {
        ...(conf.resolve || {}),
        alias: {
          ...((conf.resolve && conf.resolve.alias) || {}),
          'react-dom': '@hot-loader/react-dom'
        }
      }
    };
  },

  overrideCracoConfig: ({
    cracoConfig
  }) => {
    return {
      ...cracoConfig,
      babel: {
        ...(cracoConfig.babel || {}),
        plugins: [
          ...(cracoConfig.babel.plugins || []),
          "react-hot-loader/babel"
        ]
      }
    };
  }
};