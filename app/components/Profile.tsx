"use client";

import Link from "next/link";
import bag from "../../public/assets/img/icons/Shopping_bag.svg";
import Image from "next/image";
import { useAppSelector } from "../store/storeHooks";

export default function Profile() {
  const { products } = useAppSelector((state) => state.cart);
  const totalQuantity = products.reduce(
    (sum, current) => sum + current.quantity,
    0,
  );

  return (
    <div>
      <Link href="/cart" className="cart-icon" aria-label="Shopping Cart">
        {!!totalQuantity && <span>{totalQuantity}</span>}
        <Image src={bag} alt="Shopping Cart" />
      </Link>
    </div>
  );
}
