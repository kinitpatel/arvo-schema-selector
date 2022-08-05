const SelectedFields = ({ fields }) => {

	return (
		<ol className="ml-6">
			{fields.map(field => (
				<li key={field}>{field}</li>
			))}
		</ol>
	);
}

export default SelectedFields;