import { actionProps, initialStateProps } from "./Models";
import editActionTypes from "./action-types";

const initialState: initialStateProps = {
  id: "",
  isOpen: false,
  editPatrimony: "",
  editEquipment: "",
  editDescription: "",
};

const editReducer = (
  state: initialStateProps = initialState,
  action: actionProps
) => {
  if (action.type === editActionTypes.OPEN) {
    return { ...state, isOpen: true };
  }

  if (action.type === editActionTypes.CLOSE) {
    return initialState;
  }

  if (action.type === editActionTypes.EDIT) {
    return {
      ...state,
      id: action.payload.id,
      editPatrimony: action.payload.editPatrimony,
      editEquipment: action.payload.editEquipment,
      editDescription: action.payload.editDescription,
    };
  }

  return state;
};

export default editReducer;
