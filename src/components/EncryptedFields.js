import SelectedFields from "./SelectedFields";
import { useSelector } from "react-redux";

const EncryptedFields = () => {
	const encryptedFields = useSelector(({encryptedFields}) => encryptedFields);
  
	return (
		<div>
			You have selected below columns for encryption:
			<SelectedFields fields={Object.keys(encryptedFields)} />
		</div>
	)
}

export default EncryptedFields;