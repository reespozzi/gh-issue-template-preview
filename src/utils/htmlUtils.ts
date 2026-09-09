/**
 * HTML utility functions for escaping and basic markdown conversion
 */

/**
 * Escapes HTML special characters to prevent XSS
 * @param text - Text to escape
 * @returns Escaped HTML string
 */
const htmlEntities = [
	['&', '&amp;'],
	['<', '&lt;'],
	['>', '&gt;'],
	['"', '&quot;'],
	["'", '&#039;'],
] as const;

function decodeHtmlEntities(text: string): string {
	return text.replace(
		new RegExp(htmlEntities.map(([, e]) => e).join('|'), 'g'),
		(m) => Object.fromEntries(htmlEntities.map(([c, e]) => [e, c]))[m]
	);
}

export function escapeHtml(text: string): string {
	return text.replace(/[&<>"']/g, (m) => Object.fromEntries(htmlEntities)[m]);
}

/**
 * Converts simple markdown to HTML
 * Supports: headings, bold, italic, paragraphs
 * @param text - Markdown text to convert
 * @returns HTML string
 */
export function simpleMarkdownToHtml(text: string): string {
	// Normalize line endings and trim leading/trailing whitespace from the entire text
	let processed = text.trim();

	// Convert headings (must be done before escaping to preserve structure)
	processed = processed.replace(/^### (.+)$/gm, (_, content) => `<h3>${escapeHtml(content.trim())}</h3>`);
	processed = processed.replace(/^## (.+)$/gm, (_, content) => `<h2>${escapeHtml(content.trim())}</h2>`);
	processed = processed.replace(/^# (.+)$/gm, (_, content) => `<h1>${escapeHtml(content.trim())}</h1>`);

	// Split by double newlines to get paragraphs (preserves intentional paragraph breaks)
	const paragraphs = processed.split(/\n\s*\n/);

	const htmlParagraphs = paragraphs
		.map(para => para.trim())
		.filter(para => para.length > 0)
		.map(para => {
			// Process single line breaks within the paragraph
			const lines = para.split('\n')
				.map(line => line.trim())
				.filter(line => line.length > 0);

			// Escape HTML and apply inline formatting for each line
			const formattedLines = lines.map(line => {
				// If it's already a heading, return as-is
				if (line.match(/^<h[123]>/)) {
					return line;
				}

				let html = escapeHtml(line);

				// Convert bold (**text** or __text__)
				html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
				html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

				// Convert italic (*text* or _text_)
				html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
				html = html.replace(/_(.+?)_/g, '<em>$1</em>');

			// Convert markdown links [text](url "title") — note: input is already HTML-escaped, so " → &quot;, ' → &#039;
			html = html.replace(/\[([^\]]*?)\]\(([^)\s]+)(?:\s+(?:&quot;|&#039;)(.*?)(?:&quot;|&#039;))?\)/g, (_, linkText, url, title) => {
					const rawUrl = decodeHtmlEntities(url);
					if (/^(javascript|data|vscode|file):/i.test(rawUrl)) {
						return `[${linkText}](${url})`;
					}
					return `<a href="${/^https?:\/\//i.test(rawUrl) || /^mailto:/i.test(rawUrl) ? url : `https://${url}`}" target="_blank" rel="noopener noreferrer"${title ? ` title="${escapeHtml(decodeHtmlEntities(title))}"` : ''}>${linkText}</a>`;
				});

				return html;
			});

			// Join lines within a paragraph with a space
			return formattedLines.join(' ');
		});

	// Join paragraphs with <br><br> for spacing
	return htmlParagraphs.join('<br><br>');
}
