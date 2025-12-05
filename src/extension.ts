/**
 * GitHub Issue Template Preview Extension
 * Provides live preview of GitHub issue templates in VS Code
 */

import * as vscode from 'vscode';
import * as yaml from 'js-yaml';
import { renderIssueTemplate } from './renderer/templateRenderer';
import { getWebviewContent } from './renderer/webviewContent';

const PREVIEW_COMMAND = 'github-issue-preview.preview';
const PANEL_TYPE = 'githubIssuePreview';
const PANEL_TITLE = 'Issue Template Preview';

/**
 * Activates the extension
 */
export function activate(context: vscode.ExtensionContext): void {
	console.log('GitHub Issue Template Preview extension activated');

	const previewCommand = vscode.commands.registerCommand(
		PREVIEW_COMMAND,
		() => {
			const editor = vscode.window.activeTextEditor;
			
			if (!editor) {
				vscode.window.showErrorMessage('No active editor found. Please open a GitHub issue template file.');
				return;
			}

			// Create webview panel
			const panel = vscode.window.createWebviewPanel(
				PANEL_TYPE,
				PANEL_TITLE,
				vscode.ViewColumn.Beside,
				{
					enableScripts: false, // No scripts needed for static preview
					retainContextWhenHidden: true, // Keep webview state when hidden
				}
			);

			// Initial render
			updatePreview(panel, editor.document);

			// Update preview on document changes
			const changeSubscription = vscode.workspace.onDidChangeTextDocument(event => {
				if (event.document === editor.document) {
					updatePreview(panel, editor.document);
				}
			});

			// Cleanup when panel is disposed
			panel.onDidDispose(() => {
				changeSubscription.dispose();
			});
		}
	);

	context.subscriptions.push(previewCommand);
}

/**
 * Updates the webview preview with the current document content
 */
function updatePreview(panel: vscode.WebviewPanel, document: vscode.TextDocument): void {
	try {
		const content = document.getText();
		const html = renderIssueTemplate(content, (yamlContent: string) => yaml.load(yamlContent));
		panel.webview.html = getWebviewContent(html);
	} catch (error) {
		console.error('Error updating preview:', error);
		// The error will be displayed in the webview by the renderer
	}
}

/**
 * Deactivates the extension
 */
export function deactivate(): void {
	console.log('GitHub Issue Template Preview extension deactivated');
}
