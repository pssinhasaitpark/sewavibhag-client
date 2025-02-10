const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        return webpackConfig; // Remove CssMinimizerPlugin entirely for now
      },
    },
  };
