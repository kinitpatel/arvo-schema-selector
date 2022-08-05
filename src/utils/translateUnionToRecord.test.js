import translateUnionToRecord from "./translateUnionToRecord";

test('returns unaltered field when it is not an enum type', () => {
	const field = {
		type: 'string',
		name: 'foo'
	}

	expect(translateUnionToRecord(field)).toEqual(field);
})

test('returns unaltered field when enum type with no optional record', () => {
	const field = {
		name: 'foo',
		type: [
			null,
			"string",
		]
	}

	expect(translateUnionToRecord(field)).toEqual(field);
})

test('returns translated field when enum type with record', () => {
	const record = {
		type: 'record',
		name: 'bar',
		fields: [],
	}
	const field = {
		name: 'foo',
		type: [ // this array is expected to be replaced by the "record" object
			null,
			record,
		]
	}

	expect(translateUnionToRecord(field)).toEqual({...field, type: record });
})

