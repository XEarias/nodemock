module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true,
        "jest/globals": true
    },
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "no-undef": "error"
    },
    "plugins": ["jest"]
};