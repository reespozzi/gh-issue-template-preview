# Contributing to GitHub Issue Template Preview

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

This project follows a simple code of conduct: Be respectful, constructive, and collaborative. We're all here to make great software together.

## How Can I Contribute?

### Reporting Bugs

Before creating a bug report, please check existing issues to see if the problem has already been reported.

When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **VS Code version** and extension version
- **Sample template file** that demonstrates the issue (if applicable)

### Suggesting Features

Feature suggestions are welcome! Before submitting:

1. Check if the feature has already been suggested
2. Clearly describe the feature and its use case
3. Explain why this feature would be useful to most users

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following the code style guidelines below
3. **Add tests** if applicable
4. **Update documentation** if you've changed functionality
5. **Ensure tests pass** by running `npm test`
6. **Commit your changes** with clear, descriptive commit messages
7. **Submit a pull request** with a comprehensive description

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [VS Code](https://code.visualstudio.com/) (v1.85.0 or higher)
- [Git](https://git-scm.com/)

### Setup Steps

1. **Clone your fork:**
   ```bash
   git clone https://github.com/reespozzi/github-issue-template-preview.git
   cd github-issue-template-preview
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Open in VS Code:**
   ```bash
   code .
   ```

4. **Start development:**
   - Run `npm compile`
   - Press `F5` to launch the Extension Development Host whilst having the `dist/extension.js` file open.
   - Open a test YAML file (like `test-issue.yml`)
   - Run the "Preview GitHub Issue Template" command
   - Make changes and reload the extension to test

### Project Structure

```
gh-issue-template-preview/
├── src/
│   ├── extension.ts           # Main extension entry point
│   ├── types.ts              # TypeScript type definitions
│   ├── renderer/
│   │   ├── templateRenderer.ts   # YAML to HTML conversion
│   │   └── webviewContent.ts     # HTML/CSS for webview
│   └── utils/
│       └── htmlUtils.ts      # HTML utility functions
├── dist/                     # Compiled extension (gitignored)
├── test/                     # Test files
├── package.json              # Extension manifest
├── tsconfig.json            # TypeScript configuration
└── esbuild.js               # Build configuration
```

## Code Style Guidelines

### TypeScript

- Use **TypeScript** for all source files
- Enable **strict mode** and follow the tsconfig.json settings
- Use **explicit types** for function parameters and return values
- Add **JSDoc comments** for public APIs and complex functions
- Use **meaningful variable names** (no single-letter names except for iterators)

### Formatting

- Use **tabs for indentation**
- Use **single quotes** for strings
- Add **semicolons** at the end of statements
- Keep lines under **120 characters** when possible
- Use **trailing commas** in multi-line objects and arrays

### Code Organization

- Keep files **focused and small** (under 300 lines if possible)
- Group related functionality into **modules**
- Use **const** for values that don't change
- Prefer **arrow functions** for callbacks
- Use **async/await** instead of Promise chains

### Example

```typescript
/**
 * Renders a GitHub issue template field to HTML
 * @param field - The field to render
 * @returns HTML string representation
 */
export function renderField(field: BodyField): string {
	if (!field || !field.type) {
		return '';
	}

	const attributes = field.attributes || {};
	const label = attributes.label || field.id || '';

	return `<div class="field">
		<label>${escapeHtml(label)}</label>
	</div>`;
}
```

## Testing

### Running Tests

```bash
npm test
```

### Writing Tests

- Place test files in the `src/test/` directory
- Name test files with `.test.ts` suffix
- Write clear test descriptions
- Test both success and error cases
- Mock external dependencies when appropriate

## Building

### Development Build

```bash
npm run compile
```

### Watch Mode

```bash
npm run watch
```

### Production Build

```bash
npm run package
```

## Commit Message Guidelines

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: add support for file upload field type
fix: correct markdown rendering in descriptions
docs: update README with new examples
refactor: split renderer into separate modules
```

## Release Process

Releases are managed by the maintainers. The process involves:

1. Update version in `package.json`
2. Update `CHANGELOG.md` with changes
3. Create a git tag
4. Publish to VS Code Marketplace
5. Create GitHub release

## Questions?

If you have questions that aren't covered in this guide:

- Check the [README.md](README.md)
- Search [existing issues](https://github.com/reespozzi/github-issue-template-preview/issues)
- Open a new issue with the "question" label

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to make this extension better! 🎉
