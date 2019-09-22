const sass = require('node-sass');

module.exports = {
    "moduleNameMapper": {
        "\\.(css|scss)$": "identity-obj-proxy"
    },
    "moduleFileExtensions": [
      "json",
      "js",
      "jsx",
      "riot",
      "node"
    ],
    "transform": {
        "^.+\\.riot$": ["riot-jest-transformer", {
            registrations: [{
                type: 'css',
                name: 'scss',
                registrationCb: function(code, { options }) {
                    const { file } = options
                    console.log('Compile the sass code in', file)
                    const {css} = sass.renderSync({
                      data: code
                    });
                    return {
                      code: css.toString(),
                      map: null
                    }
                }
            }]
        }],
        "^.+\\.jsx?$": "babel-jest",
    },
    "coverageDirectory": "../coverage"
};
