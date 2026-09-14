import ProductDetails from "@/app/components/ProductDetails";
import { API_BASE } from "@/lib/constants";

interface IParams {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: IParams) {
  const { id } = await params;

  const response = await fetch(`${API_BASE}/api/product/${id}`, {
    next: { revalidate: 60 },
  });

  const data = await response.json();

  return (
    <main className="page-product" style={{padding: "64px 0"}}>
      <div className="container">
        <ProductDetails product={data} />
      </div>
    </main>
  );
}
