module.exports = {
    overrideWebpackConfig: ({
        webpackConfig,
        cracoConfig,
        pluginOptions,
        context: {
            env,
            paths
        }
    }) => {
        if (pluginOptions.preText) {
            console.log(pluginOptions.preText);
        }

        if (env === "production")
            return webpackConfig;

        const condition = u => typeof u === 'object' && u.loader && u.loader.includes('eslint-loader');
        const rule = webpackConfig.module.rules.find(rule => rule.use && rule.use.some(condition));

        if (rule) {
            const use = rule.use.find(condition);
            if (use) {
                use.options.emitWarning = true;
            }
        }
        return webpackConfig;
    },

    overrideCracoConfig: ({
        cracoConfig,
        pluginOptions,
        context: {
            env,
            paths
        }
    }) => {

        if (!cracoConfig.babel)
            cracoConfig.babel = {};

        if (!cracoConfig.babel.plugins)
            cracoConfig.babel.plugins = [];

        cracoConfig.babel.plugins.push("react-hot-loader/babel")
        return cracoConfig;
    }
};