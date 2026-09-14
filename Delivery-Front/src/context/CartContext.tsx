import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import toast from "react-hot-toast";
import { readCart, type CartItem, type Product } from "$/lib/cartStorage";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string | number) => void;
  updateQuantity: (productId: string | number, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readCart);

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("app_cart", JSON.stringify(items));
    } catch {
      toast.error("Your cart could not be saved. Changes may be lost when you reload.", { id: "cart-storage" });
    }
  }, [items]);

  const addToCart = (product: Product, quantity: number = 1) => {
    if (!Number.isSafeInteger(quantity) || quantity <= 0) return;
    setItems((prevItems: CartItem[]) => {
      const existingItem = prevItems.find((item: CartItem) => item.productId === product.id);

      if (existingItem) {
        if (!Number.isSafeInteger(existingItem.quantity + quantity)) return prevItems;
        return prevItems.map((item: CartItem) =>
          item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }

      return [...prevItems, { productId: product.id, quantity, product }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string | number) => {
    setItems((prevItems: CartItem[]) => prevItems.filter((item: CartItem) => item.productId !== productId));
  };

  const updateQuantity = (productId: string | number, quantity: number) => {
    if (!Number.isSafeInteger(quantity)) return;
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((prevItems: CartItem[]) =>
      prevItems.map((item: CartItem) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartCount = items.reduce((total: number, item: CartItem) => total + item.quantity, 0);
  const cartTotal = items.reduce((total: number, item: CartItem) => {
    return total + (item.product.price ?? 0) * item.quantity;
  }, 0);

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart-ийг CartProvider дотор ашиглах ёстой");
  }

  return context;
}
