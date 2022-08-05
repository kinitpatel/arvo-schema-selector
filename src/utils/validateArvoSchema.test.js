import validateArvoSchema from "./validateArvoSchema";

test('throws error when root schema is not an object', () => {
  const schema = [];
  
	expect(() => validateArvoSchema(schema)).toThrowError('Root schema element must be a valid JSON object');
});

test('throws error when root schema is not of type record', () => {
  const schema = {
		type: 'string'
	}
  
	expect(() => validateArvoSchema(schema)).toThrowError('Root schema element must be of type "record"');
});

test('throws error when root name property is missing', () => {
	const schema = {
		type: 'record',
	}

	expect(() => validateArvoSchema(schema)).toThrowError('Record schema element root has a child with missing "name" property');
})

test('throws error when root fields property is missing', () => {
	const schema = {
		type: 'record',
		name: 'foo'
	}

	expect(() => validateArvoSchema(schema)).toThrowError('Record schema element foo is missing "fields" property');
})

test('throws error when root fields property is not Array', () => {
	const schema = {
		type: 'record',
		name: 'foo',
		fields: {},
	}

	expect(() => validateArvoSchema(schema)).toThrowError('Record schema element foo, "fields" property must be an array');
})

test('throws error when child field is missing name property', () => {
	const schema = {
		type: 'record',
		name: 'foo',
		fields: [{
			type: {
				type: 'record',
				name: 'bar',
				fields: []
			}
		}],
	}

	expect(() => validateArvoSchema(schema)).toThrowError('Record schema element foo has a child with missing "name" property');
})

test('throws error when child record is missing name property', () => {
	const schema = {
		type: 'record',
		name: 'foo',
		fields: [{
			name: 'bar',
			type: {
				type: 'record',
				fields: []
			}
		}],
	}

	expect(() => validateArvoSchema(schema)).toThrowError('Record schema element foo.bar has a child with missing "name" property');
})

test('throws error when field is missing name property', () => {
	const schema = {
		type: 'record',
		name: 'foo',
		fields: [{
			name: 'bar',
			type: {
				type: 'record',
				name: 'foobar',
				fields: []
			}
		}, {
			type: 'string',
		}],
	}

	expect(() => validateArvoSchema(schema)).toThrowError('Record schema element foo has a field with missing "name" property');
})

test('throws error when nested field is missing name property', () => {
	const schema = {
		type: 'record',
		name: 'foo',
		fields: [{
			name: 'bar',
			type: {
				type: 'record',
				name: 'foobar',
				fields: [{
					type: {
						type: 'record',
						fields: [],
					}
				}]
			}
		}],
	}

	expect(() => validateArvoSchema(schema)).toThrowError('Record schema element foo.bar.foobar has a child with missing "name" property');
})