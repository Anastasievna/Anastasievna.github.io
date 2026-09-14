import { API_BASE } from "@/lib/constants";
import Product from "./Product";
import { IProduct } from "@/types";
import "./ProductsList.css";
import { current } from "@reduxjs/toolkit";

interface searchParamsProps {
  searchParams: {
    type: string | string[];
    sort: "price_asc" | "price_desc" | "rating" | "new";
    search: string;
  };
}

export default async function ProductsList({
  searchParams,
}: searchParamsProps) {
  const response = await fetch(`${API_BASE}/api/products`, {
    next: { revalidate: 60 },
  });

  const data: IProduct[] = await response.json();
  //Фильтрация реализована через searchParams, т.к. требование `ProductList` — Server Component
  let filteredData = data;

  if (searchParams && !!searchParams.type) {
    filteredData = filteredData.filter((item) =>
      searchParams.type.includes(item.type),
    );
  }

  if (searchParams && !!searchParams.search) {
    filteredData = filteredData.filter((item) =>
      item.name
        .toLowerCase()
        .includes(searchParams.search.trim().toLowerCase()),
    );
  }

  if (searchParams && !!searchParams.sort) {
    filteredData.sort((a, b) => {
      switch (searchParams.sort) {
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "rating":
          return (
            b.reviews.reduce((sum, current) => sum + current.rating, 0) /
              (b.reviews.length ?? 1) -
            a.reviews.reduce((sum, current) => sum + current.rating, 0) /
              (a.reviews.length ?? 1)
          );
        default:
          return 0;
      }
    });
  }

  return (
    <div className="product-grid">
      {filteredData && filteredData.length ? (
        filteredData.map((item) => <Product product={item} key={item.id} />)
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
}
