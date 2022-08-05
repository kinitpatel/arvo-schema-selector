import { TOGGLE_MASKED_FIELD, TOGGLE_ENCRYPTED_FIELD, CLEAR_SELECTED_FIELDS } from './actions';

const initialState = {
  maskedFields: {}, // Object where keys represent masked fields
	encryptedFields: {}, // Object where keys represent encrypted fields
};

function rootReducer(state = initialState, action) {
	const {type, key} = action;

	const encryptedFields = {...state.encryptedFields};
	const maskedFields = {...state.maskedFields};

  switch (type) {
    case CLEAR_SELECTED_FIELDS: 
      return initialState

    case TOGGLE_MASKED_FIELD:
      // Clear field from encryptedFields when we toggle its value in maskedFields
      // field cannot be both masked and encrypted
			delete encryptedFields[key];
      // Toggle field in maskedFields
			maskedFields[key] ? delete maskedFields[key] : maskedFields[key] = true;

      return {
        encryptedFields,
				maskedFields,
      };
    case TOGGLE_ENCRYPTED_FIELD:
      // Clear field from maskedFields when we toggle its value in encryptedFields
      // field cannot be both masked and encrypted
      delete maskedFields[key];
      // Toggle field in encryptedFields
			encryptedFields[key] ? delete encryptedFields[key] : encryptedFields[key] = true;

      return {
        encryptedFields,
				maskedFields,
      };

    default:
      return state;
  }
}

export default rootReducer;