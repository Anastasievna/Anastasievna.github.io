"use client";

import { IProduct } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./Product.css";

type PropsType = {
  product: IProduct;
};

export default function Product({ product }: PropsType) {
  const router = useRouter();

  const goToProductPage = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <div className="product-card" onClick={goToProductPage}>
      <Image
        src={product.image}
        width={272}
        height={247}
        alt={product.name}
        className="product-card__image"
        loading="eager"
      />
      <div className="product-card__info">
        <h4 className="product-card__name">{product.name}</h4>
        <p className="product-card__price">${product.price.toFixed(2)}</p>
        <p className="product-card__description">{product.shortDesc}</p>
      </div>
    </div>
  );
}
