/**
 * Type definitions for GitHub Issue Templates
 */

export interface IssueTemplate {
	name?: string;
	description?: string;
	title?: string;
	labels?: string[];
	assignees?: string[];
	body?: BodyField[];
}

export interface BodyField {
	type: FieldType;
	id?: string;
	attributes?: FieldAttributes;
	validations?: FieldValidations;
}

export type FieldType = 'markdown' | 'textarea' | 'input' | 'dropdown' | 'checkboxes';

export interface FieldAttributes {
	label?: string;
	description?: string;
	placeholder?: string;
	value?: string;
	options?: (string | CheckboxOption)[];
}

export interface CheckboxOption {
	label: string;
	required?: boolean;
}

export interface FieldValidations {
	required?: boolean;
}
