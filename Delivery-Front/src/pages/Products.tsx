import { useSearchParams } from "react-router-dom";
import ProductCard from "$/components/ProductCard";
import { useCatalog } from "$/context/CatalogContext";
import { filterProducts } from "$/lib/filterProducts";

const controlClass = "mt-2 w-full rounded-xl border border-app-border bg-white px-4 py-3";
const Products = ({ dealsOnly = false }: { dealsOnly?: boolean }) => {
  const { products } = useCatalog();
  const [params, setParams] = useSearchParams();
  const search = params.get("search") ?? params.get("q") ?? "";
  const category = params.get("category") ?? "";
  const sort = params.get("sort") ?? "";
  const result = filterProducts(products, search, category, sort, dealsOnly);
  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (key === "search") next.delete("q");
    if (value) next.set(key, value); else next.delete(key);
    setParams(next, { replace: true });
  };
  const categories = [
    ["fruits-vegetables", "Fruits & Vegetables"], ["dairy-eggs", "Dairy & Eggs"],
    ["bakery", "Bakery"], ["beverages", "Beverages"], ["pantry", "Pantry"],
    ["snacks", "Snacks"], ["seafood", "Sea Food"], ["frozzenfoods", "Frozen Foods"], ["personalcare", "Personal Care"],
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 text-app sm:px-6">
      <h1 className="font-semibold">{dealsOnly ? "Deals" : "Products"}</h1>
      <p className="mt-2 text-app-text-light">Find your groceries and add them to your cart.</p>
      <div className="my-6 grid gap-4 sm:grid-cols-3">
        <label className="text-sm font-medium">Search products<input type="search" value={search} onChange={event => update("search", event.target.value)} placeholder="Search for groceries…" className={controlClass} /></label>
        <label className="text-sm font-medium">Category<select value={category} onChange={event => update("category", event.target.value)} className={controlClass}>
          <option value="">All categories</option>
          {category && !categories.some(([value]) => value === category) && <option value={category}>{category}</option>}
          {categories.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select></label>
        <label className="text-sm font-medium">Sort by<select value={sort} onChange={event => update("sort", event.target.value)} className={controlClass}>
          <option value="">Featured</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="rating">Top rated</option>
        </select></label>
      </div>
      <div className="mb-5 flex items-center justify-between gap-4"><p aria-live="polite">{result.length} {result.length === 1 ? "product" : "products"}</p>{(search || category || sort) && <button type="button" onClick={() => setParams({})} className="font-medium underline">Clear filters</button>}</div>
      {result.length ? <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">{result.map(product => <ProductCard key={product.id} product={product} />)}</div> : <div className="rounded-2xl bg-app-cream p-8 text-center"><h2>No products found</h2><p className="mt-2">Try another search or clear your filters.</p></div>}
    </section>
  );
};
export default Products;
