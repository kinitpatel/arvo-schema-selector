import isRecord from "../utils/isRecord";
import translateUnionToRecord from "../utils/translateUnionToRecord";
import { Panel } from 'react-bulma-components'
import FieldList from "./FieldList";

import './Record.css';
import { useState } from "react";

const Record = ({ schema, name, parentScope='' }) => {
	const scope = parentScope ? `${parentScope}.${schema.name}` : schema.name;
	const fields = schema.fields.filter((field) => !isRecord(field));
	const records = schema.fields.map(translateUnionToRecord).filter(isRecord);

	const [isCollapsed, setIsCollapsed] = useState(false);

	return (
		<div>
		<Panel.Block renderAs="a" onClick={() => setIsCollapsed(!isCollapsed)}>
			<Panel.Icon>
				{isCollapsed ? <ion-icon name="caret-forward-outline"></ion-icon> : <ion-icon name="caret-down-outline"></ion-icon>}
			</Panel.Icon>
			{name || schema.name}
		</Panel.Block>
		{!isCollapsed &&
			<div className="record__field-list">
				<FieldList fields={fields} scope={scope}/>
				
				{records.map(record => (
						<Record schema={record.type} name={record.name} parentScope={scope} key={record.name} ></Record>
				))
				}
			</div>
		}
		</div>
	);
}

export default Record;