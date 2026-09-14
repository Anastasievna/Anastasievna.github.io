import ProductsList from "./components/HomePage/ProductsList";
import Image from "next/image";
import banner from "../public/assets/img/background/hopfen-fields.jpg";
import "./page.css";
import SideBar from "./components/HomePage/Sidebar";
import SortBar from "./components/HomePage/SortBar";

interface productsProps {
  searchParams: Promise<{
    type: string | string[];
    sort: "price_asc" | "price_desc" | "rating" | "new";
    search: string;
  }>;
}

export default async function HomePage({ searchParams }: productsProps) {
  const params = await searchParams;

  return (
    <main>
      <section className="hero-banner">
        <Image
          src={banner}
          alt="Beautiful hops on a dark background"
          className="hero-banner__image"
        />
        <div className="hero-banner__overlay"></div>
      </section>
      <div className="container main-content-grid">
        <SideBar />
        <section className="products-area">
          <SortBar />
          <ProductsList searchParams={params} />
        </section>
      </div>
    </main>
  );
}
