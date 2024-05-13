export interface actionProps {
  type: "edit/open" | "edit/close" | "edit/edit";
  payload: initialStateProps;
}

export interface initialStateProps {
  id: string;
  isOpen: boolean;
  editPatrimony: string;
  editEquipment: string;
  editDescription: string;
}
