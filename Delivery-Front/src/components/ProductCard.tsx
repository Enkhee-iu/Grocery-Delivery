import { Star } from "lucide-react";
import { useCart } from "../context/CartContext";

type Product = {
    id: number;
    name: string;
    image?: string;
    price?: number;
    rating?: number;
    reviewCount?: number;
    discount?: number;
};

interface Props {
    product: Product;
}

const ProductCard = ({ product }: Props) => {
    const currency = "$";
    const { addToCart } = useCart();

    return (
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="relative aspect-square overflow-hidden">
                <img
                    src={product.image ?? "https://placehold.co/600x600?text=Product"}
                    alt={product.name}
                    className="h-full w-full object-cover p-4 transition-all duration-300 hover:p-2"
                />

                {product.discount && product.discount > 0 && (
                    <div className="absolute left-3 top-3 rounded-full bg-orange-500 px-2 py-1 text-[10px] font-semibold uppercase text-white">
                        {product.discount}% OFF
                    </div>
                )}
            </div>

            <div className="p-3 text-zinc-700">
                <h3 className="mb-2 text-sm font-medium leading-snug text-app">{product.name}</h3>

                {product.rating && product.rating > 0 && (
                    <div className="mb-2 flex items-center gap-1">
                        <Star className="size-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-medium text-app">{product.rating}</span>
                        <span className="text-xs text-app-text-light">({product.reviewCount ?? 0})</span>
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-app">
                        {currency}
                        {product.price ?? 0}
                    </span>
                    <button
                        type="button"
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