import SelectedFields from "./SelectedFields";
import { useSelector } from "react-redux";

const MaskedFields = () => {
	const maskedFields = useSelector(({maskedFields}) => maskedFields);
  
	return (
		<div>
			You have selected below columns for masking:
			<SelectedFields fields={Object.keys(maskedFields)} />
		</div>
	)
}

export default MaskedFields;