import isRecord from "./isRecord";

test('returns false if field is not a record', () => {
	const field = {
		type: "string",
		name: "foo"
	};

	expect(isRecord(field)).toBe(false);
})

test('returns true if field is a record', () => {
	const field = {
		type: {
			type: 'record',
			name: 'bar',
			fields: [],
		},
		name: "foo"
	};

	expect(isRecord(field)).toBe(true);
})