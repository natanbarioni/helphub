export type DataProps = OrderStyleProps & {
  id: string;
  patrimony: string;
  equipment: string;
  description: string;
  created_at: {
    nanoseconds: number;
    seconds: number;
  };
};

export type OrderProps = {
  data: DataProps;
};
