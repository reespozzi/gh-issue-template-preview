/**
 * Renders GitHub issue templates to HTML
 */

import { IssueTemplate, BodyField, CheckboxOption } from '../types';
import { escapeHtml, simpleMarkdownToHtml } from '../utils/htmlUtils';

/**
 * Renders an issue template YAML content to HTML
 * @param content - YAML content string
 * @param parseYaml - Function to parse YAML (injected for testability)
 * @returns HTML string
 */
export function renderIssueTemplate(content: string, parseYaml: (content: string) => unknown): string {
	try {
		const parsed = parseYaml(content) as IssueTemplate;

		if (!parsed || typeof parsed !== 'object') {
			return '<p class="error">Invalid YAML format: Expected an object</p>';
		}

		let html = '<div class="issue-template">';

		// Template name
		if (parsed.name) {
			html += `<h1>${escapeHtml(parsed.name)}</h1>`;
		}

		// Template description
		if (parsed.description) {
			html += `<p class="description">${escapeHtml(parsed.description)}</p>`;
		}

		// Title field
		if (parsed.title) {
			html += `<div class="field">
				<label>Title</label>
				<input type="text" value="${escapeHtml(parsed.title)}" readonly />
			</div>`;
		}

		// Labels
		if (parsed.labels && Array.isArray(parsed.labels)) {
			html += `<div class="field">
				<label>Labels</label>
				<div class="labels">
					${parsed.labels.map((label: string) =>
						`<span class="label">${escapeHtml(label)}</span>`
					).join('')}
				</div>
			</div>`;
		}

		// Assignees
		if (parsed.assignees && Array.isArray(parsed.assignees)) {
			html += `<div class="field">
				<label>Assignees</label>
				<div class="assignees">
					${parsed.assignees.map((assignee: string) =>
						`<span class="assignee">@${escapeHtml(assignee)}</span>`
					).join(', ')}
				</div>
			</div>`;
		}

		// Body fields
		if (parsed.body && Array.isArray(parsed.body)) {
			html += '<div class="body-fields">';
			parsed.body.forEach((field: BodyField) => {
				html += renderBodyField(field);
			});
			html += '</div>';
		}

		html += '</div>';
		return html;
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		return `<p class="error">Error parsing template: ${escapeHtml(errorMessage)}</p>`;
	}
}

/**
 * Renders a single body field from the issue template
 * @param field - Body field to render
 * @returns HTML string
 */
function renderBodyField(field: BodyField): string {
	if (!field || !field.type) {
		return '';
	}

	let html = '<div class="body-field">';

	const attributes = field.attributes || {};
	const validations = field.validations || {};
	const label = attributes.label || field.id || '';
	const description = attributes.description || '';
	const placeholder = attributes.placeholder || '';
	const value = attributes.value || '';
	const isRequired = validations.required === true;

	switch (field.type) {
		case 'markdown':
			if (value) {
				html += `<div class="markdown-content">${simpleMarkdownToHtml(value)}</div>`;
			}
			break;

		case 'textarea':
			html += `<label>${escapeHtml(label)}${isRequired ? '<span class="required-asterisk"> *</span>' : ''}</label>`;
			if (description) {
				html += `<p class="field-description">${simpleMarkdownToHtml(description)}</p>`;
			}
			html += `<textarea placeholder="${escapeHtml(placeholder)}" ${isRequired ? 'required' : ''}>${escapeHtml(value)}</textarea>`;
			break;

		case 'input':
			html += `<label>${escapeHtml(label)}${isRequired ? '<span class="required-asterisk"> *</span>' : ''}</label>`;
			if (description) {
				html += `<p class="field-description">${simpleMarkdownToHtml(description)}</p>`;
			}
			html += `<input type="text" placeholder="${escapeHtml(placeholder)}" value="${escapeHtml(value)}" ${isRequired ? 'required' : ''} />`;
			break;

		case 'dropdown':
			html += `<label>${escapeHtml(label)}${isRequired ? '<span class="required-asterisk"> *</span>' : ''}</label>`;
			if (description) {
				html += `<p class="field-description">${simpleMarkdownToHtml(description)}</p>`;
			}
			html += '<select>';
			if (attributes.options && Array.isArray(attributes.options)) {
				attributes.options.forEach((option: string | CheckboxOption) => {
					const optionValue = typeof option === 'string' ? option : option.label;
					html += `<option>${escapeHtml(optionValue)}</option>`;
				});
			}
			html += '</select>';
			break;

		case 'checkboxes':
			html += `<label>${escapeHtml(label)}${isRequired ? '<span class="required-asterisk"> *</span>' : ''}</label>`;
			if (description) {
				html += `<p class="field-description">${simpleMarkdownToHtml(description)}</p>`;
			}
			if (attributes.options && Array.isArray(attributes.options)) {
				attributes.options.forEach((option: string | CheckboxOption) => {
					const optionLabel = typeof option === 'string' ? option : option.label;
					const required = typeof option === 'object' ? option.required : false;
					html += `<div class="checkbox-option">
						<input type="checkbox" ${required ? 'required' : ''} />
						<span>${escapeHtml(optionLabel)}</span>
					</div>`;
				});
			}
			break;
	}

	html += '</div>';
	return html;
}
