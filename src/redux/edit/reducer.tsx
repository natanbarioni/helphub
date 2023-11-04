import { actionProps, initialStateProps } from "./Models";

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
  if (action.type === "edit/open") {
    return { ...state, isOpen: true };
  }

  if (action.type === "edit/close") {
    return { ...state, isOpen: false };
  }

  if (action.type === "edit/edit") {
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
