import { Panel } from "react-bulma-components";
import Field from "./Field";

import './FieldList.css';

const FieldList = ({ fields, scope }) => {
	return (
		<div>
			<Panel.Block>
				<Panel.Icon></Panel.Icon>
				<span className="field-list__title">Column</span>
				<span className="field-list__checkbox">Masked</span>
				<span className="field-list__checkbox">Encrypted</span>
			</Panel.Block>
			
			{fields.map(field => <Field name={field.name} scope={scope} key={field.name}></Field>)}
		</div>
	)
}

export default FieldList;