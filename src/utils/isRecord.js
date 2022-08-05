/**
 * Returns true if this field represents a complex data type of type 'record'
 *
 * @param {Object } field - ARVO schema for field
 * @returns {Boolean}
 */
function isRecord(field) {

	if (Array.isArray(field?.type)) {
		return field.type.some((type) => type?.type === 'record');
	}

	return field?.type?.type === 'record';
}

export default isRecord;