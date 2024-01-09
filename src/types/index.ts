import { ReactNode } from react;

export interface productType {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
  acts?: ReactNode;
}

export interface Rating {
  rate: number;
  count: number;
}
