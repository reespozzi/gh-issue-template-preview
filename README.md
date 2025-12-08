# GitHub Issue Template Preview

Preview and validate GitHub issue templates (YAML format) directly in VS Code with live rendering and syntax validation!

<img width="1600" height="1002" alt="image" src="https://github.com/user-attachments/assets/7a79db12-b415-481d-a8a5-3dc39bc175c5" />


## Features

- 🔍 **Live Preview**: See your GitHub issue templates rendered in real-time as you edit
- ✅ **Full Support**: Handles all GitHub issue template field types (markdown, textarea, input, dropdown, checkboxes)
- 🎨 **Native Styling**: Uses VS Code's theme colors for seamless integration
- 📝 **Validation**: Instantly spot YAML syntax errors
- 🚀 **Lightweight**: Fast, efficient, and works entirely offline

## Usage

1. Open any GitHub issue template file (`.yml` or `.yaml`)
2. Open the Command Palette (`Cmd+Shift+P` on macOS or `Ctrl+Shift+P` on Windows/Linux)
3. Type "Preview GitHub Issue Template" and select the command
4. A preview pane will open beside your editor
5. The preview updates automatically as you edit the template


## Supported Template Features

This extension supports all GitHub issue template field types:

- **Markdown**: Display formatted content
- **Textarea**: Multi-line text input fields
- **Input**: Single-line text input fields  
- **Dropdown**: Select menus with options
- **Checkboxes**: Multiple checkbox options

Also supports:
- Template name and description
- Default issue title
- Labels and assignees
- Required field indicators
- Field descriptions with markdown formatting

## Example Template

```yaml
name: Bug Report
description: File a bug report to help us improve
title: "[Bug]: "
labels: ["bug", "triage"]
assignees: ["username"]
body:
  - type: markdown
    attributes:
      value: |
        ## Thanks for reporting a bug!
        Please fill out the information below.
  
  - type: textarea
    id: what-happened
    attributes:
      label: What happened?
      description: Tell us what you expected vs what actually happened
      placeholder: Describe the bug...
    validations:
      required: true
  
  - type: dropdown
    id: severity
    attributes:
      label: Severity
      options:
        - Critical
        - High
        - Medium
        - Low
    validations:
      required: true
```

## Requirements

- Visual Studio Code version 1.85.0 or higher

## Installation

### From VS Code Marketplace (Recommended)

1. Open VS Code
2. Press `Cmd+Shift+X` (macOS) or `Ctrl+Shift+X` (Windows/Linux)
3. Search "ReesPozzi.gh-issue-template-preview"
4. Click Install


## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/reespozzi/gh-issue-template-preview.git
   cd gh-issue-template-preview
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Open in VS Code:
   ```bash
   code .
   ```

4. Press `F5` to launch the Extension Development Host

5. Make your changes and test them in the development host

6. Run tests:
   ```bash
   npm test
   ```

## Known Issues

- Complex markdown features (code blocks, tables) in field descriptions are not fully rendered yet
- No support for GitHub issue form schema validation (coming soon)

See the [issues page](https://github.com/reespozzi/gh-issue-template-preview/issues) for a complete list of known issues and feature requests.


## License

This extension is licensed under the [MIT License](LICENSE).

---

**Enjoy!** If you find this extension helpful, please consider:
- ⭐ Starring the GitHub Repo
