import * as assert from 'assert';
import * as yaml from 'js-yaml';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { renderIssueTemplate } from '../renderer/templateRenderer';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	suite('Template Renderer Tests', () => {
		test('Required checkbox options should show red asterisk', () => {
			const yamlContent = `
name: Test Template
body:
  - type: checkboxes
    attributes:
      label: Test Checkboxes
      options:
        - label: Required option
          required: true
        - label: Optional option
          required: false
        - label: Default option
`;

			const result = renderIssueTemplate(yamlContent, yaml.load);
			
			// Should contain required asterisk for required checkbox
			assert.ok(result.includes('Required option<span class="required-asterisk"> *</span>'));
			
			// Should NOT contain asterisk for optional checkbox  
			assert.ok(result.includes('Optional option</span>'));
			assert.ok(!result.includes('Optional option<span class="required-asterisk"> *</span>'));
			
			// Should NOT contain asterisk for default checkbox (no required property)
			assert.ok(result.includes('Default option</span>'));
			assert.ok(!result.includes('Default option<span class="required-asterisk"> *</span>'));
		});

		test('Field-level required checkboxes should show asterisk on label', () => {
			const yamlContent = `
name: Test Template  
body:
  - type: checkboxes
    attributes:
      label: Required Field
    validations:
      required: true
`;

			const result = renderIssueTemplate(yamlContent, yaml.load);
			
			// Should contain required asterisk on the main field label
			assert.ok(result.includes('<label>Required Field<span class="required-asterisk"> *</span></label>'));
		});

		test('Other required fields should still work correctly', () => {
			const yamlContent = `
name: Test Template
body:
  - type: input
    attributes:
      label: Required Input
    validations:
      required: true
  - type: dropdown
    attributes:
      label: Required Dropdown
    validations:
      required: true
`;

			const result = renderIssueTemplate(yamlContent, yaml.load);
			
			// Input and dropdown should still show asterisks
			assert.ok(result.includes('<label>Required Input<span class="required-asterisk"> *</span></label>'));
			assert.ok(result.includes('<label>Required Dropdown<span class="required-asterisk"> *</span></label>'));
		});
	});
});
