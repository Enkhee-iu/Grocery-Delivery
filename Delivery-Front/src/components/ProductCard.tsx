import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

type Product = {
    id: number;
    name: string;
    image?: string;
    price?: number;
    rating?: number;
    reviewCount?: number;
    discount?: number;
    originalPrice?: number;
};

interface Props {
    product: Product;
}

const ProductCard = ({ product }: Props) => {
    const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";
    const { addToCart } = useCart();
    const discount = product.discount ?? (product.originalPrice && product.price != null && product.originalPrice > product.price
        ? Math.round((1 - product.price / product.originalPrice) * 100) : 0);

    return (
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-md">
            <Link to={`/products/${product.id}`} className="relative block aspect-square overflow-hidden">
                <img
                    src={product.image ?? "https://placehold.co/600x600?text=Product"}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover p-4 transition-all duration-300 hover:p-2"
                />

                {discount > 0 && (
                    <div className="absolute left-3 top-3 rounded-full bg-orange-500 px-2 py-1 text-[10px] font-semibold uppercase text-white">
                        {discount}% OFF
                    </div>
                )}
            </Link>

            <div className="p-3 text-zinc-700">
                <h3 className="mb-2 text-sm font-medium leading-snug text-app"><Link to={`/products/${product.id}`} className="hover:underline">{product.name}</Link></h3>

                {product.rating != null && product.rating > 0 && (
                    <div className="mb-2 flex items-center gap-1">
                        <Star className="size-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-medium text-app">{product.rating}</span>
                        {product.reviewCount != null && <span className="text-xs text-app-text-light">({product.reviewCount})</span>}
                    </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-base font-bold text-app">
                        {currency}
                        {product.price ?? 0}
                    </span>
                    <button
                        type="button"
                        aria-label={`Add ${product.name} to cart`}
                        onClick={() => addToCart(product)}
                        className="rounded-full bg-app-green px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-app-green/90"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard
