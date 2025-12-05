/**
 * Generates the HTML content for the webview panel
 */

/**
 * Wraps rendered content in a complete HTML document with styles
 * @param content - Rendered HTML content
 * @returns Complete HTML document string
 */
export function getWebviewContent(content: string): string {
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline';">
	<title>GitHub Issue Template Preview</title>
	<style>
		body {
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
			padding: 20px;
			max-width: 900px;
			margin: 0 auto;
			background: var(--vscode-editor-background);
			color: var(--vscode-editor-foreground);
			line-height: 1.6;
		}
		.issue-template {
			background: var(--vscode-editor-background);
		}
		h1 {
			font-size: 24px;
			margin-bottom: 8px;
			color: var(--vscode-editor-foreground);
			font-weight: 600;
		}
		.description {
			color: var(--vscode-descriptionForeground);
			margin-bottom: 20px;
			font-size: 14px;
		}
		.field {
			margin-bottom: 20px;
		}
		label {
			display: block;
			font-weight: 600;
			margin-bottom: 6px;
			font-size: 14px;
		}
		.required-asterisk {
			color: #f85149;
		}
		.field-description {
			color: var(--vscode-descriptionForeground);
			font-size: 12px;
			margin-bottom: 8px;
			margin-top: -4px;
			line-height: 1.6;
		}
		.field-description h1,
		.field-description h2,
		.field-description h3 {
			margin: 8px 0;
			font-weight: 600;
			color: var(--vscode-editor-foreground);
		}
		.field-description h1 {
			font-size: 16px;
		}
		.field-description h2 {
			font-size: 14px;
		}
		.field-description h3 {
			font-size: 13px;
		}
		input[type="text"],
		textarea,
		select {
			width: 100%;
			padding: 8px 12px;
			border: 1px solid var(--vscode-input-border);
			background: var(--vscode-input-background);
			color: var(--vscode-input-foreground);
			border-radius: 6px;
			font-family: inherit;
			font-size: 14px;
			box-sizing: border-box;
		}
		textarea {
			min-height: 100px;
			resize: vertical;
			font-family: inherit;
		}
		input[type="text"]:focus,
		textarea:focus,
		select:focus {
			outline: 1px solid var(--vscode-focusBorder);
			outline-offset: -1px;
		}
		.labels {
			display: flex;
			flex-wrap: wrap;
			gap: 8px;
		}
		.label {
			background: var(--vscode-badge-background);
			color: var(--vscode-badge-foreground);
			padding: 4px 10px;
			border-radius: 12px;
			font-size: 12px;
			font-weight: 500;
		}
		.assignees {
			font-size: 14px;
			color: var(--vscode-editor-foreground);
		}
		.assignee {
			color: var(--vscode-textLink-foreground);
			text-decoration: none;
		}
		.body-fields {
			margin-top: 24px;
		}
		.body-field {
			margin-bottom: 24px;
			padding-bottom: 24px;
			border-bottom: 1px solid var(--vscode-panel-border);
		}
		.body-field:last-child {
			border-bottom: none;
		}
		.markdown-content {
			background: var(--vscode-textBlockQuote-background);
			border-left: 4px solid var(--vscode-textBlockQuote-border);
			padding: 12px 16px;
			margin-bottom: 16px;
			line-height: 1.6;
		}
		.markdown-content h1,
		.markdown-content h2,
		.markdown-content h3 {
			margin: 8px 0;
			font-weight: 600;
		}
		.markdown-content h1 {
			font-size: 18px;
		}
		.markdown-content h2 {
			font-size: 16px;
		}
		.markdown-content h3 {
			font-size: 14px;
		}
		.markdown-content br {
			display: block;
			content: "";
			margin: 4px 0;
		}
		.checkbox-option {
			display: flex;
			align-items: center;
			gap: 8px;
			margin-bottom: 8px;
		}
		.checkbox-option input[type="checkbox"] {
			width: auto;
			margin: 0;
		}
		.error {
			color: var(--vscode-errorForeground);
			background: var(--vscode-inputValidation-errorBackground);
			border: 1px solid var(--vscode-inputValidation-errorBorder);
			padding: 12px;
			border-radius: 6px;
			font-size: 14px;
		}
	</style>
</head>
<body>
	${content}
</body>
</html>`;
}
