"use client";
import Link from "next/link";
import "./Cart.css";
import { useAppDispatch, useAppSelector } from "../store/storeHooks";
import { addProduct, removeProduct } from "../store/slices/cartSlice";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { IProduct } from "@/types";

export default function Cart() {
  const { products, total } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const changeQuantity = (e, product: IProduct) => {
    const type = e.currentTarget.getAttribute("data-action");
    console.log(type);
    switch (type) {
      case "increase":
        dispatch(addProduct(product));
        break;
      case "decrease":
        dispatch(removeProduct({product, type: "one"}));
        break;
      case "remove":
        dispatch(removeProduct({product, type: "full"}));
        break;
    }
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>
      <div className="cart-items-list" id="cart-items-list">
        {products.map((item) => (
          <div className="cart-item" key={item.product.id}>
            <Image
              src={item.product.image}
              width="160"
              height="160"
              alt={item.product.name}
              className="cart-item__image"
            />
            <div className="cart-item__body">
              <div className="cart-item__details">
                <h2 className="cart-item__name">{item.product.name}</h2>
                <div className="cart-item__price-info">
                  <p className="cart-item__price">${item.totalPrice ? item.totalPrice.toFixed(2) : ""}</p>
                  <span className="cart-item__price-tag">
                    ${item.product.priceTag}
                  </span>
                </div>
              </div>

              <div className="cart-item__actions">
                <div className="cart-item__quantity-selector">
                  <button
                    className="quantity-btn-cart"
                    data-action="decrease"
                    onClick={(e) => changeQuantity(e, item.product)}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span className="quantity-value-cart">{item.quantity}</span>
                  <button
                    className="quantity-btn-cart"
                    data-action="increase"
                    onClick={(e) => changeQuantity(e, item.product)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
                <button
                  className="button--remove"
                  data-action="remove"
                  onClick={(e) => changeQuantity(e, item.product)}
                >
                  Remove
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="cart-summary__total">
          <p>Total</p>
          <p id="cart-total-price">${total.toFixed(2)}</p>
        </div>
        <Link
          href="#"
          className="button button--primary button--checkout"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
