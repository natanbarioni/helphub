export interface DataProps {
  id: string;
  status: "all" | "open" | "closed";
  patrimony: string;
  equipment: string;
  description: string;
  created_at: {
    nanoseconds: number;
    seconds: number;
  };
}

export interface OrderProps {
  data: DataProps;
}
