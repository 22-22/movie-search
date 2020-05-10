module.exports = {
  
    "env": {
        "browser": true,
        "es6": true,
        "jest": true
    },
    "extends": "airbnb-base",

    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        'no-undef': 0,
        'no-param-reassign': 0,
        'no-unused-vars': 0
    }

  };