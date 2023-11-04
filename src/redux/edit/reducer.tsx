import { actionProps, initialStateProps } from "./Models";

const initialState: initialStateProps = {
  isOpen: false,
  patrimony: "",
  equipment: "",
  description: "",
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

  return state;
};

export default editReducer;
