import { useDispatch, useSelector } from 'react-redux';
import { toggleEncryptedField, toggleMaskedField } from '../redux/actions'
import { Form, Panel } from 'react-bulma-components';

import './Field.css';

const Field = ({ name, scope }) => {
	const key = `${scope}.${name}`;

	const isMasked = Boolean(useSelector((state) => state.maskedFields[key]))
	const isEncrypted = Boolean(useSelector((state) => state.encryptedFields[key]))
	const dispatch = useDispatch();

	return (
		<Panel.Block>
			<Panel.Icon></Panel.Icon>
			<span className="field__title">{name}</span>
			<span className="field__checkbox"><Form.Checkbox checked={isMasked} onChange={() => dispatch(toggleMaskedField(key))} /></span>
			<span className="field__checkbox"><Form.Checkbox checked={isEncrypted} onChange={() => dispatch(toggleEncryptedField(key))} /></span>
		</Panel.Block>
	)
}

export default Field;