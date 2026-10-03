export interface IProduct {
  id: number;
  name: string;
  type: string;
  agonylevel: string;
  image: string;
  shortdesc: string;
  description: string;
  priceTag: string;
  price: number;
  specification: ISpecification;
  reviews: IReview[];
}

interface IReview {
  rating: number;
  heading: string;
  text: string;
  authorName: string;
  authorAvatar: string;
}

interface ISpecification {
  [key: string]: string | string[] | number;
}

export interface ICartProduct extends IProduct {
  totalPrice: number;
  amount: number;
}

export interface IUser {
  id: string;
  email: string;
  password: string;
}

export interface IUserDetails {
  id: string;
  userId: string;
  name: string;
  phone: string;
  city: string;
  address: string;
}

export interface IUserFullDetails extends IUserDetails {
  email: string;
}

export interface IOrder {
  id: number;
  orderNumber: string;
  date: string;
  status: string;
  typePay: string;
  total: number;
  shipping: IShipping;
}

export interface IShipping {
  name: string;
  phone: string;
  city: string;
  address: string;
}
