import isRecord from "./isRecord";
import translateUnionToRecord from "./translateUnionToRecord";

/**
 *	Validates a ARVO schema that is type='record'
 *  Validates all fields and sub record fields
 *
 * @param {Object} record - ARVO schema record
 * @param {String} parentScope - Scope of parent record
 * 
 * @throws Will throw an error record contains invalid schema
 */
function validateRecord(record, parentScope) {
	// Every record must have a name property
	if (!record.name) {
		throw new Error(`Record schema element ${parentScope || 'root'} has a child with missing "name" property`);
	}

	const scope = parentScope ? `${parentScope}.${record.name}` : record.name;

	// Every record must have a fields property that is an array of fields/records
	if (!record.fields) {
		throw new Error(`Record schema element ${scope} is missing "fields" property`);
	}
	if (!Array.isArray(record.fields)) {
		throw new Error(`Record schema element ${scope}, "fields" property must be an array`);
	}

	// Extract fields that are not sub records
	const fields = record.fields.filter((field) => !isRecord(field));
	// Extract sub records, translating any records that are using the optional null Enum pattern
	const records = record.fields.map(translateUnionToRecord).filter(isRecord);

	// Validate fields that are not records
	fields.map(field => validateField(field, scope));

	// Validate sub records
	records.map(record => {
		if (!record.name) throw new Error(`Record schema element ${scope} has a child with missing "name" property`);
		return validateRecord(record.type, `${scope}.${record.name}`)
	});
}

/**
 * Validates an ARVO schema field that is not of type record
 *
 * @param {Object} field - ARVO schema field
 * @param {String} parentScope - Scope of parent record
 * 
 * @throws Will throw an error field has invalid schema
 */
function validateField(field, parentScope) {
	if (!field.name) {
		throw new Error(`Record schema element ${parentScope || 'root'} has a field with missing "name" property`)
	}
}

/**
 * Validates an ARVO schema document from the root including all fields and sub records
 *
 * @param {Object} schema - root ARVO schema document
 * 
 * @throws Will throw an error if schema is invalid with message containing details
 */
function validateArvoSchema(schema) {
	if (typeof schema !== 'object' || Array.isArray(schema)) {
		throw new Error('Root schema element must be a valid JSON object');
	}
	if (schema.type !== 'record') {
		throw new Error('Root schema element must be of type "record"');
	}

	validateRecord(schema);
}

export default validateArvoSchema;