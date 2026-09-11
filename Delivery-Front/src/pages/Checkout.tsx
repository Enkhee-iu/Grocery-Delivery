import { useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2Icon, ShoppingBagIcon } from "lucide-react";
import { useCart } from "$/context/CartContext";
import { getCartTotals } from "$/lib/cartTotals";
import { saveOrder, type Order } from "$/lib/orders";

const inputClass = "mt-2 w-full rounded-xl border border-app-border bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-app-green";
const buttonClass = "inline-block rounded-xl bg-app-green px-5 py-3 text-center font-semibold text-white hover:bg-app-green-light disabled:opacity-50";

const Checkout = () => {
  const { items, cartTotal, clearCart, setIsCartOpen } = useCart();
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitting = useRef(false);
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";
  const totals = getCartTotals(cartTotal, items.length);
  const formatPrice = (amount: number) => `${currency}${amount.toFixed(2)}`;

  const submitOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting.current || confirmedOrder || items.length === 0) return;
    setError("");
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const customer = { name: value("name"), phone: value("phone"), address: value("address"), notes: value("notes") };
    const digits = customer.phone.replace(/\D/g, "").length;
    if (!customer.name || !customer.address || !/^[+\d\s()-]+$/.test(customer.phone) || digits < 8 || digits > 15) {
      setError("Enter your name, delivery address, and a valid phone number (8–15 digits).");
      return;
    }
    if (items.some(({ product, quantity }) => !Number.isFinite(product.price) || (product.price ?? -1) < 0 || !Number.isInteger(quantity) || quantity <= 0) || !Number.isFinite(totals.total)) {
      setError("Some cart items have invalid prices or quantities. Please update your cart before continuing.");
      return;
    }
    submitting.current = true;
    setIsSubmitting(true);
    try {
      const order: Order = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        customer,
        items: items.map(({ productId, product, quantity }) => ({ productId, name: product.name, price: product.price!, quantity })),
        ...totals,
        currency,
        paymentMethod: "cash-on-delivery",
      };
      saveOrder(order);
      setConfirmedOrder(order);
      clearCart();
      setIsCartOpen(false);
    } catch {
      setError("We couldn't save your order in this browser. Your cart is unchanged. Please check browser storage and try again.");
    } finally {
      submitting.current = false;
      setIsSubmitting(false);
    }
  };

  if (confirmedOrder) return (
    <section className="mx-auto max-w-2xl px-5 py-16 text-center text-app" aria-live="polite">
      <CheckCircle2Icon className="mx-auto mb-5 size-14 text-app-green" />
      <h1 className="font-semibold">Demo order saved</h1>
      <p className="mt-3 text-app-text-light">Your order is saved in this browser. It has not been sent to a store and no payment has been taken.</p>
      <p className="mt-5 break-all text-sm">Order ID: {confirmedOrder.id}</p>
      <p className="mt-2 font-semibold">Total: {confirmedOrder.currency}{confirmedOrder.total.toFixed(2)}</p>
      <Link to="/orders" className={`${buttonClass} mt-6`}>View my orders</Link>
    </section>
  );

  if (items.length === 0) return (
    <section className="mx-auto max-w-xl px-5 py-16 text-center text-app">
      <ShoppingBagIcon className="mx-auto mb-5 size-12 text-app-text-light" />
      <h1 className="font-semibold">Your cart is empty</h1>
      <p className="mt-3 text-app-text-light">Add some groceries before checking out.</p>
      <Link to="/" className={`${buttonClass} mt-6`}>Continue shopping</Link>
    </section>
  );

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 text-app">
      <h1 className="font-semibold">Checkout</h1>
      <p className="mt-2 text-app-text-light">Review your groceries and add your delivery details.</p>
      <p className="mt-5 rounded-xl bg-app-cream p-4 text-sm">Demo checkout: orders are saved only in this browser. No delivery is booked and no payment is collected.</p>
      <form onSubmit={submitOrder} className="mt-8 grid items-start gap-8 lg:grid-cols-2">
        <div className="space-y-6 rounded-2xl border border-app-border bg-white p-6">
          <h2 className="font-semibold">Delivery details</h2>
          <label className="block text-sm font-medium" htmlFor="checkout-name">Full name
            <input id="checkout-name" name="name" autoComplete="name" required maxLength={100} className={inputClass} />
          </label>
          <label className="block text-sm font-medium" htmlFor="checkout-phone">Phone number
            <input id="checkout-phone" name="phone" type="tel" autoComplete="tel" required maxLength={30} className={inputClass} />
          </label>
          <label className="block text-sm font-medium" htmlFor="checkout-address">Delivery address
            <textarea id="checkout-address" name="address" autoComplete="street-address" required maxLength={500} rows={3} placeholder="City, district, street, building and apartment" className={inputClass} />
          </label>
          <label className="block text-sm font-medium" htmlFor="checkout-notes">Delivery notes (optional)
            <textarea id="checkout-notes" name="notes" maxLength={500} rows={2} placeholder="Entrance code or directions" className={inputClass} />
          </label>
          <fieldset className="rounded-xl bg-app-cream p-4">
            <legend className="px-1 font-semibold">Payment method</legend>
            <label className="flex items-center gap-2 text-sm"><input type="radio" name="payment" value="cash-on-delivery" defaultChecked />Cash on delivery</label>
          </fieldset>
        </div>
        <aside className="rounded-2xl border border-app-border bg-white p-6" aria-label="Order summary">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-semibold">Order summary</h2>
            <button type="button" onClick={() => setIsCartOpen(true)} className="text-sm font-medium underline">Edit cart</button>
          </div>
          <ul className="mt-4 divide-y divide-app-border">
            {items.map(({ productId, product, quantity }) => (
              <li key={productId} className="flex items-center gap-3 py-4">
                {product.image ? <img src={product.image} alt={product.name} className="size-16 rounded-lg object-contain" /> : <ShoppingBagIcon className="size-10 shrink-0 text-app-text-light" />}
                <div className="min-w-0 flex-1"><p className="break-words font-medium">{product.name}</p><p className="text-sm text-app-text-light">{quantity} × {formatPrice(product.price ?? 0)}</p></div>
                <span className="font-medium">{formatPrice((product.price ?? 0) * quantity)}</span>
              </li>
            ))}
          </ul>
          <dl className="space-y-3 border-t border-app-border pt-4 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatPrice(totals.subtotal)}</dd></div>
            <div className="flex justify-between"><dt>Delivery</dt><dd>{totals.deliveryFee === 0 ? "Free" : formatPrice(totals.deliveryFee)}</dd></div>
            <div className="flex justify-between text-lg font-semibold"><dt>Total</dt><dd>{formatPrice(totals.total)}</dd></div>
          </dl>
          <p className="mt-3 text-xs text-app-text-light">Free delivery on orders above {formatPrice(20)}.</p>
          {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <button type="submit" disabled={isSubmitting} className={`${buttonClass} mt-6 w-full`}>{isSubmitting ? "Saving…" : "Confirm demo order"}</button>
        </aside>
      </form>
    </section>
  );
};

export default Checkout;
