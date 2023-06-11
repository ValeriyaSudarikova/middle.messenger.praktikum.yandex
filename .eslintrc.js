module.exports = {
	"env": {
		"browser": true,
		"node":true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended"
	],
	"overrides": [
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": [
		"@typescript-eslint"
	],
	"rules": {
		"no-unused-vars": [
			0,
			{ argsIgnorePattern: "^_" }
		],
		"no-empty-function": [
			0,
			{ allow: ["arrowFunctions"] }
		],
		"@typescript-eslint/no-var-requires":[
			0
		],
		"@typescript-eslint/no-non-null-assertion": [
			0
		],
		"@typescript-eslint/no-explicit-any": [
			0
		],
		"@typescript-eslint/no-empty-function": [0],
		"@typescript-eslint/no-non-null-asserted-optional-chain": [0],
		"@typescript-eslint/ban-ts-comment": [0],
		"no-prototype-builtins": [0],
		"@typescript-eslint/no-this-alias": [0],
		"@typescript-eslint/no-unused-vars": [0],
		"no-mixed-spaces-and-tabs":[0],
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"never"
		]
	}
}
