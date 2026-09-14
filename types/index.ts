export interface IProduct {
  id: number;
  name: string;
  type: string;
  price: number;
  priceTag: string;
  description: string;
  shortDesc: string;
  image: string;
  specification: ProductSpecification;
  reviews: IProductReview[];
}

interface ProductSpecification {
  [key: string]: string | string[];
}

interface IProductReview {
  rating: number;
  heading: string;
  text: string;
  authorName: string;
  authorAvatar: string;
}

export interface ICartProduct {
  product: IProduct;
  quantity: number;
  totalPrice: number;
}
