/* global module, __dirname */

module.exports = {
    "entry": './src/index.jsx',
    "output": {
        "path": `${__dirname}/dist`,
        "filename": 'index.min.js'
    },
    "module": {
      "loaders": [
        {
          "test": /.jsx$/, "loader": 'babel-loader', "exclude": /node_modules/
        }
      ]
    }
};
