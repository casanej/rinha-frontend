const styledComponentArrowFn =
    'TaggedTemplateExpression > TemplateLiteral > ArrowFunctionExpression';

const ignoredNodes = [
    styledComponentArrowFn,
    `${styledComponentArrowFn} > BlockStatement`,
];

module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 2020,
        "extraFileExtensions": [".jpeg", ".png", ".gif", ".jpg", ".svg", ".bmp", ".tif", ".tiff", ".webp"],
        "project": [
            "./tsconfig.json"
        ],
        "tsconfigRootDir": "./",
        "warnOnUnsupportedTypeScriptVersion": false
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "root": true,
    "rules": {
        //"getter-returns": "error",
        "no-compare-neg-zero": "error",
        "no-console": "warn",
        "no-debugger": "warn",
        "no-dupe-args": "error",
        //"no-dupe-if-else": "error",
        "no-dupe-keys": "error",
        "no-duplicate-case": "error",
        "no-empty": "error",
        "no-extra-parens": "warn",
        "no-extra-boolean-cast": ["error", { "enforceForLogicalOperands": true }],
        "no-extra-semi": "error",
        //"no-function-assign": "error",
        "no-import-assign": "error",
        "no-regex-spaces": "error",
        "no-setter-return": "error",
        "no-sparse-arrays": "error",
        "no-unreachable": "warn",
        "no-unsafe-negation": "warn",
        "use-isnan": "error",

        "block-scoped-var": "error",
        "complexity": ["error", 20],
        "default-case-last": "error",
        "no-constructor-return": "error",
        "no-empty-function": "error",
        "no-eq-null": "error",
        "no-fallthrough": "error",
        "no-multi-spaces": "error",
        "no-return-assign": "error",
        "no-self-assign": "error",
        // "no-unused-vars": ["warn", { "args": "none" , "argsIgnorePattern": "^_" }],
        "no-self-compare": "error",
        "require-await": "error",

        "array-bracket-spacing": "error",
        "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
        "camelcase": ["error", { "ignoreImports": true, "ignoreGlobals": true }],
        "comma-spacing": ["error", { "before": false, "after": true }],
        "comma-style": ["error", "last"],
        "func-call-spacing": ["error", "never"],
        "sort-imports": ["error", {
            "ignoreCase": false,
            "ignoreDeclarationSort": true,
            "ignoreMemberSort": false,
            "memberSyntaxSortOrder": ["all", "multiple", "single", "none"],
            "allowSeparatedGroups": true
        }],
        "indent": [
            "error",
            2,
            ignoredNodes,
            {
                "SwitchCase": 1
            }
        ],
        "jsx-quotes": ["error", "prefer-single"],
        "key-spacing": ["error", { "afterColon": true }],
        // "lines-between-class-members": ["error", "always"],
        "max-depth": ["error", 4],
        "no-mixed-spaces-and-tabs": "error",
        "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 1, "maxBOF": 0 }],
        "no-trailing-spaces": "error",
        "no-unneeded-ternary": "error",
        "no-whitespace-before-property": "error",
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "semi-spacing": ["error", { "after": true }],
        "semi-style": ["error", "last"],
        //"sort-keys": ["error", "asc", {"caseSensitive": true, "natural": false, "minKeys": 3}],
        "space-before-blocks": "error",
        "space-before-function-paren": ["error", { "anonymous": "never", "named": "never", "asyncArrow": "always" }],
        "space-infix-ops": "error",
        "space-unary-ops": ["error", { "words": true, "nonwords": false }],
        "spaced-comment": ["error", "always", { "exceptions": ["-", "+"] }],
        "switch-colon-spacing": "error",
        "no-var": "error",
        "no-useless-constructor": "error",
        "no-duplicate-imports": "error",
        "no-const-assign": "error",
        "prefer-const": "error",

        "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }]
    }
}
