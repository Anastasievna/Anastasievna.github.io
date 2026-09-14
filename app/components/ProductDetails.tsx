"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/storeHooks";
import { ICartProduct, IProduct } from "@/types";
import { addProduct, removeProduct } from "../store/slices/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
  faCartShopping,
  faChevronDown,
  faStar
} from "@fortawesome/free-solid-svg-icons";
import "./ProductDetails.css";

type PropsType = {
  product: IProduct;
};

export default function ProductDetails({ product }: PropsType) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.cart);
  const [cartProduct, setCartProduct] = useState<ICartProduct | null>(null);

  const addToCart = () => {
    dispatch(addProduct(product));
  };

  const removeFromCart = () => {
    dispatch(removeProduct({product, type: "one"}));
  };

  const goToCart = () => {
    router.push("/cart");
  };

  useEffect(() => {
    const itemProduct = products.find((item) => item.product.id === product.id);
    setCartProduct(itemProduct ? itemProduct : null);
  }, [products]);

  return (
    <>
      <section className="product-details-section">
        <Image
          src={product.image}
          width={640}
          height={484}
          alt={product.name}
          className="product-image"
          loading="eager"
        />
        <div className="product-info-column">
          <div className="product-title-price">
            <h1 className="product-name">{product.name}</h1>
            <div className="price-section">
              <span className="price-tag">{product.priceTag}</span>
              <p className="product-price">
                ${product.price ? product.price.toFixed(2) : ""}
              </p>
            </div>
            <div className="product-description">{product.description}</div>
          </div>

          <div className="cart-controls">
            {cartProduct ? (
              <div className="quantity-counter">
                <button className="quantity-btn" onClick={removeFromCart}>
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span className="quantity-value">
                  {cartProduct.quantity} in cart
                </span>
                <button className="quantity-btn" onClick={addToCart}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            ) : (
              <button
                className="button button--primary add-to-cart-button"
                id="add-to-cart-btn"
                onClick={addToCart}
              >
                <FontAwesomeIcon icon={faCartShopping} />
                <span>Add to Cart</span>
              </button>
            )}
          </div>
        </div>
      </section>
      <section className="accordion-section">
        <details className="accordion-item">
          <summary className="accordion-title">
            <h3>Technical Specifications</h3>
            <FontAwesomeIcon icon={faChevronDown} className="accordion-icon" />
          </summary>
          <div className="accordion-content">
            <ul>
              {Object.keys(product.specification).map((key, i) => (
                <li key={i}>
                  <strong>{key}:</strong> {product.specification[key]}
                </li>
              ))}
            </ul>
          </div>
        </details>
      </section>
      <section className="reviews-section">
        <h2 className="reviews-title">Latest reviews</h2>
        {product.reviews.length ? (
          <div className="reviews-grid">
            {product.reviews.map((review, i) => (
              <div className="review-card" key={i}>
                <div className="review-rating">
                  {Array(review.rating)
                    .fill(null)
                    .map((_, index) => (
                      <FontAwesomeIcon icon={faStar} key={index} />
                    ))}
                </div>
                <div className="review-body">
                  <h4 className="review-heading">{review.heading}</h4>
                  <p className="review-text">{review.text}</p>
                </div>
                <div className="review-author">
                  <Image
                    src={review.authorAvatar}
                    alt="User avatar"
                    width="40"
                    height="40"
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  />
                  <span className="author-name">{review.authorName}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>There are not reviews</p>
        )}
      </section>
    </>
  );
}
