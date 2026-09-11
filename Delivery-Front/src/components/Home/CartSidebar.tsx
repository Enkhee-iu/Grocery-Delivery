import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MinusIcon, PlusIcon, ShoppingBagIcon, Trash2Icon, XIcon } from "lucide-react";
import { useCart } from "$/context/CartContext";

const CartSidebar = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";
  const {
    items, cartCount, cartTotal, updateQuantity, removeFromCart,
    isCartOpen, setIsCartOpen,
  } = useCart();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!isCartOpen) {
      dialog.close();
      return;
    }

    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      dialog.close();
    };
  }, [isCartOpen]);

  const closeCart = () => setIsCartOpen(false);
  const deliveryFee = items.length === 0 || cartTotal > 20 ? 0 : 1.99;
  const grandTotal = cartTotal + deliveryFee;
  const formatPrice = (amount: number) => `${currency}${amount.toFixed(2)}`;
  const quantityButtonClass = "rounded-lg p-2 transition hover:bg-app-cream";

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="cart-title"
      onCancel={closeCart}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeCart();
      }}
      className="fixed inset-y-0 left-auto right-0 m-0 h-dvh max-h-none w-full max-w-md bg-white p-0 text-app shadow-2xl backdrop:bg-black/40"
    >
      <div className="flex h-full flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-app-border p-5">
          <div className="flex items-center gap-2">
            <ShoppingBagIcon className="size-5" />
            <h2 id="cart-title" className="text-lg font-medium">Your Cart</h2>
            <span className="rounded-full bg-app-cream px-2 py-0.5 text-xs font-semibold">
              {cartCount} {cartCount === 1 ? "item" : "items"}
            </span>
          </div>
          <button type="button" onClick={closeCart} aria-label="Close cart" className={quantityButtonClass}>
            <XIcon className="size-5" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
            <ShoppingBagIcon className="size-12 text-app-text-light" />
            <p>Your cart is empty.</p>
            <Link to="/products" onClick={closeCart} className="rounded-xl bg-app-green px-5 py-3 font-semibold text-white hover:bg-app-green-light">
              Browse products
            </Link>
          </div>
        ) : (
          <>
            <ul className="min-h-0 flex-1 divide-y divide-app-border overflow-y-auto px-5">
              {items.map(({ productId, product, quantity }) => (
                <li key={productId} className="flex gap-3 py-5">
                  <Link to={`/products/${encodeURIComponent(productId)}`} onClick={closeCart} className="shrink-0">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="size-20 rounded-xl object-contain" />
                    ) : (
                      <span className="flex size-20 items-center justify-center rounded-xl bg-app-cream" aria-label={product.name}>
                        <ShoppingBagIcon className="size-8" />
                      </span>
                    )}
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link to={`/products/${encodeURIComponent(productId)}`} onClick={closeCart} className="font-medium hover:underline">
                      {product.name}
                    </Link>
                    <p className="mt-1 text-sm text-app-text-light">{formatPrice(product.price ?? 0)} each</p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="flex items-center rounded-xl border border-app-border">
                        <button type="button" onClick={() => updateQuantity(productId, quantity - 1)} aria-label={`Decrease quantity of ${product.name}`} className={quantityButtonClass}>
                          <MinusIcon className="size-4" />
                        </button>
                        <span className="min-w-8 text-center text-sm" aria-live="polite">{quantity}</span>
                        <button type="button" onClick={() => updateQuantity(productId, quantity + 1)} aria-label={`Increase quantity of ${product.name}`} className={quantityButtonClass}>
                          <PlusIcon className="size-4" />
                        </button>
                      </div>
                      <button type="button" onClick={() => removeFromCart(productId)} aria-label={`Remove ${product.name}`} className="rounded-lg p-2 text-red-600 hover:bg-red-50">
                        <Trash2Icon className="size-4" />
                      </button>
                    </div>
                    <p className="mt-2 text-sm font-semibold">{formatPrice((product.price ?? 0) * quantity)}</p>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="space-y-4 border-t border-app-border p-5">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatPrice(cartTotal)}</dd></div>
                <div className="flex justify-between"><dt>Delivery</dt><dd>{deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}</dd></div>
                <div className="flex justify-between text-base font-semibold"><dt>Total</dt><dd>{formatPrice(grandTotal)}</dd></div>
              </dl>
              <p className="text-xs text-app-text-light">Free delivery on orders above {formatPrice(20)}.</p>
              <Link to="/checkout" onClick={closeCart} className="block rounded-xl bg-app-green px-5 py-3 text-center font-semibold text-white transition hover:bg-app-green-light">
                Proceed to checkout
              </Link>
            </footer>
            <div className="flex justify-between text-base font-semibold border-t border-app-border pt-3">
              <span>Total</span>
              <span>{currency}{grandTotal.toFixed(2)}</span>

            </div>

          </>
        )}
      </div>
    </dialog>
  );
};

export default CartSidebar;
