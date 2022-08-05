/**
 * Converts ARVO schema field of type UNION that has an optional record into a record
 * If the UNION contains at least one record, the type will be replaced by the first record
 * UNIONS with multiple records are not supported in this implementation
 * 
 * If field is not a UNION or UNION does not contain an optional record, field is returned unaltered
 *
 * @param {Object} field - ARVO field schema
 * @returns {Object} - converted ARVO field schema into record if optional record is defined
 */
function translateUnionToRecord(field) {
	// If this is not an UNUM, return unmodified field
	if(!Array.isArray(field.type)) {
		return field;
	}

	// If we find a record within UNION options, set the field type to that record
	// otherwise return the unmodified field
	const record = field.type.find(type => type?.type ==='record');
	return record ? {...field, type: record} : field;
}

export default translateUnionToRecord;