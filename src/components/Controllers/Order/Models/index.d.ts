export type OrderProps = OrderStyleProps & {
  id: string;
  patrimony: string;
  equipment: string;
  description: string;
  created_at: {
    nanoseconds: number;
    seconds: number;
  };
};

export type Props = {
  data: OrderProps;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};