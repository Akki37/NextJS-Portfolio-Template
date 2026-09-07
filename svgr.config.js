/** @type {import('@svgr/core').Config} */
module.exports = {
  typescript: true,
  expandProps: "end",
  dimensions: false,
  svgoConfig: {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
      "prefixIds",
    ],
  },
};
