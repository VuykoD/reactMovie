{
    "extends": "airbnb",
    "rules": {
        "class-methods-use-this": "off",
        "max-len": "warn",
        "no-underscore-dangle": "off",
        "no-confusing-arrow": "off",
        "no-return-assign": "off",
        "consistent-return": "off",
        "react/require-extension": "off",
        "react/no-multi-comp": ["warn", { "ignoreStateless": true }],
        "react/jsx-closing-bracket-location": "off",
        "react/prefer-stateless-function": "off",
        "import/default": "off",
        "import/no-duplicates": "off",
        "import/named": "off",
        "import/namespace": "off",
        "import/no-unresolved": "off",
        "import/no-named-as-default": "error",
        "import/no-webpack-loader-syntax": "off",
        "comma-dangle": "off",  // not sure why airbnb turned this on. gross!
        "indent": [1, 2, {"SwitchCase": 1}],
        "react/jsx-indent": "off",
        "no-console": "warn",
        "no-alert": "warn",
        "global-require": "off",
        "no-use-before-define": "off",
        "react/no-unused-prop-types": [1, {"skipShapeProps": true}],
        "react/no-children-prop": 0,
        "jsx-a11y/href-no-hash": "off",
        "react/require-default-props": "off",
        "react/no-find-dom-node": "warn",
        "jsx-a11y/label-has-for": [
            1, {
                "required": { "some": ["nesting", "id"] },
                "allowChildren": true
            }
        ],
        "jsx-a11y/no-autofocus": "off",
        "jsx-a11y/no-noninteractive-tabindex": [
            1,
            { "tags": ["li"] }
        ],
        "no-multi-assign": 0,
        "jsx-a11y/no-static-element-interactions": 1,
        "jsx-a11y/no-noninteractive-element-interactions": 1,
        "import/extensions": 1,
        "react/no-array-index-key": "off",
        "camelcase": 0,
        "react/destructuring-assignment": "off",
        "react/jsx-filename-extension": [1, { "extensions": [".js"] }],
        "arrow-parens": 0,
        "no-plusplus": [2, { "allowForLoopAfterthoughts": true }],
        "operator-linebreak": [2, "before", { "overrides": {
            "?": "after",
            "&&": "off"
        } }],
        "react/jsx-wrap-multilines": "off",
        "prefer-destructuring": ["error", {"object": false, "array": false}]
    }
}
