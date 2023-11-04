export interface actionProps {
  type: "edit/open" | "edit/close" | "edit/edit";
  payload: string;
}

export interface initialStateProps {
  isOpen: boolean;
  patrimony: string;
  equipment: string;
  description: string;
}
