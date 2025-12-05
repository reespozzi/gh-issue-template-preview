import typescriptEslint from "typescript-eslint";

export default [
	{
		files: ["**/*.ts"],
		plugins: {
			"@typescript-eslint": typescriptEslint.plugin,
		},
		languageOptions: {
			parser: typescriptEslint.parser,
			ecmaVersion: 2022,
			sourceType: "module",
			parserOptions: {
				project: "./tsconfig.json",
			},
		},
		rules: {
			// Naming conventions
			"@typescript-eslint/naming-convention": [
				"warn",
				{
					selector: "import",
					format: ["camelCase", "PascalCase"],
				},
				{
					selector: "variable",
					format: ["camelCase", "UPPER_CASE", "PascalCase"],
					leadingUnderscore: "allow",
				},
				{
					selector: "function",
					format: ["camelCase", "PascalCase"],
				},
				{
					selector: "typeLike",
					format: ["PascalCase"],
				},
			],

			// Code quality
			"curly": "warn",
			"eqeqeq": ["warn", "always"],
			"no-throw-literal": "warn",
			"semi": "warn",
			"prefer-const": "warn",
			"no-var": "error",

			// TypeScript specific
			"@typescript-eslint/explicit-function-return-type": [
				"warn",
				{
					allowExpressions: true,
					allowTypedFunctionExpressions: true,
				},
			],
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
				},
			],
		},
	},
	{
		ignores: ["out/**", "dist/**", "**/*.d.ts", "node_modules/**"],
	},
];
