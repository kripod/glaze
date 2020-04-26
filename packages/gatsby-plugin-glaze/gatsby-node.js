/** @type {import('gatsby').GatsbyNode["onCreateBabelConfig"]} */
exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: 'babel-plugin-glaze',
    options: {},
  });
};
