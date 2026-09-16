import { Link, useParams } from "react-router-dom";
import { products } from "$/data/products";
import { useCart } from "$/context/CartContext";

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find(item => String(item.id) === id);
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";
  if (!product) return <section className="mx-auto max-w-xl px-5 py-16 text-center text-app"><h1>Product not found</h1><Link to="/products" className="mt-5 inline-block underline">Browse products</Link></section>;
  return (
    <section className="mx-auto max-w-5xl px-5 py-10 text-app">
      <Link to="/products" className="font-medium underline">Back to products</Link>
      <div className="mt-6 grid items-center gap-8 md:grid-cols-2">
        <img src={product.image} alt={product.name} className="aspect-square w-full rounded-2xl bg-app-cream object-contain" />
        <div>
          <p className="text-sm text-app-text-light">{product.category}</p>
          <h1 className="mt-2 font-semibold">{product.name}</h1>
          <p className="mt-3" aria-label={`Rated ${product.rating} out of 5`}>★ {product.rating} / 5</p>
          <p className="mt-5 text-2xl font-semibold">{currency}{product.price.toFixed(2)} {product.originalPrice > product.price && <del className="text-base font-normal text-app-text-light">{currency}{product.originalPrice.toFixed(2)}</del>}</p>
          <button type="button" onClick={() => addToCart(product)} className="mt-6 rounded-xl bg-app-green px-6 py-3 font-semibold text-white hover:bg-app-green-light">Add to cart</button>
          <p className="mt-3 text-sm text-app-text-light">You can adjust the quantity in your cart.</p>
        </div>
      </div>
    </section>
  );
};
export default ProductPage;
