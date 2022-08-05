export const TOGGLE_MASKED_FIELD = 'TOGGLE_MASKED_FIELD';
export const TOGGLE_ENCRYPTED_FIELD = 'TOGGLE_ENCRYPTED_FIELD';
export const CLEAR_SELECTED_FIELDS = 'CLEAR_FIELDS';

export function toggleMaskedField(key) {
  return { type: TOGGLE_MASKED_FIELD, key };
}

export function toggleEncryptedField(key) {
  return { type: TOGGLE_ENCRYPTED_FIELD, key };
}

export function clearSelectedFields() {
  return { type: CLEAR_SELECTED_FIELDS }
}