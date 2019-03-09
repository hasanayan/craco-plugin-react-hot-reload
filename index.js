module.exports = {
  overrideWebpackConfig: ({
    webpackConfig,
    context: {
      env
    }
  }) => {
    if (env === "production") {
      return webpackConfig;
    }

    let conf = webpackConfig;

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

    return conf;
  },

  overrideCracoConfig: ({
    cracoConfig
  }) => {
    if (!cracoConfig.webpack) {
      cracoConfig.webpack = {};
    }
    if (!cracoConfig.webpack.alias) {
      cracoConfig.webpack.alias = {}; 
    }
    const webpackAliases = cracoConfig.webpack.alias;

    webpackAliases["react-dom"] = '@hot-loader/react-dom';

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