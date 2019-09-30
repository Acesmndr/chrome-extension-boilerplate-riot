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
                preprocessorModulePath: "./riot-scss-preprocessor"
            }]
        }],
        "^.+\\.jsx?$": "babel-jest",
    },
    "coverageDirectory": "../coverage"
};
