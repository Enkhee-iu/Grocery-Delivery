import { useCart } from "$/context/CartContext";
import { ShoppingBagIcon, XIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";


const CartSidebar = () => {

    const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

    const {items, updateQuantity, removeFromCart, cartTotal, isCartOpen, setIsCartOpen} = useCart();

    const navigate = useNavigate();

    if(!isCartOpen) return null;

    const deliveryFee = cartTotal > 20 ? 0 : 1.99;
    const grantTotal = cartTotal + deliveryFee;

    return (
        <>
        <div className="fixed right-0 top-0 h-full max-w-md bg-white z-550 shadow-2x1 flex flex-col animate-slide-in-right">
            <div className="flex items-center gap-2">
              <ShoppingBagIcon/>
              <h2 className="text-lg. font-medium">Your Cart</h2>
              <span className="px-2 py-0.5 text-xs font-semibold bg-app-cream rounded-full">
                {items.length} items
              </span>
            </div>
            <button className="p-2 rounded-xl hover:bg-app-cream transition-colors">
                <XIcon className="size-5"/>
            </button>
        </div>
        
        </>
    )
}

export default CartSidebar;
