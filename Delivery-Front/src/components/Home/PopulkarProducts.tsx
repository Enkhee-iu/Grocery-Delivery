import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";
import { useCatalog } from "$/context/CatalogContext";

const PopularProducts = () => {
  const { products } = useCatalog();
  return (
  <section className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-6">
    <div className="mb-8 flex items-center justify-between gap-4">
      <div><h2 className="text-2xl font-semibold text-app">Popular Products</h2><p className="mt-1 text-sm text-app-text-light">Top-rated products this season</p></div>
      <Link to="/products" className="shrink-0 font-medium text-app-green underline">View all</Link>
    </div>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {products.map(product => <ProductCard key={product.id} product={product} />)}
    </div>
  </section>
); };
export default PopularProducts;
