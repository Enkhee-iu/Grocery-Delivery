import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle2Icon } from "lucide-react";
import { readOrders } from "$/lib/orders";

const OrderTracking = () => {
  const { id } = useParams();
  const [result] = useState(() => {
    try { return { orders: readOrders(), error: "" }; }
    catch { return { orders: [], error: "Your saved orders could not be loaded. Check browser storage and reload to try again." }; }
  });
  const order = result.orders.find(item => item.id === id);
  const money = (amount: number) => `${order?.currency ?? ""}${amount.toFixed(2)}`;

  return (
    <section className="mx-auto max-w-3xl px-5 py-10 text-app">
      <Link to="/orders" className="font-medium underline">Back to my orders</Link>
      {result.error ? <p role="alert" className="mt-6 rounded-xl bg-red-50 p-4 text-red-700">{result.error}</p> : !order ? (
        <div className="mt-8 rounded-2xl bg-app-cream p-6">
          <h1 className="font-semibold">Order not found</h1>
          <p className="mt-3">This order is not saved in this browser. Check the link or return to your orders.</p>
        </div>
      ) : (
        <>
          <h1 className="mt-6 font-semibold">Order details</h1>
          <p className="mt-2 break-all text-sm text-app-text-light">Order {order.id}</p>
          <p className="mt-1 text-sm text-app-text-light"><time dateTime={order.createdAt}>{new Date(order.createdAt).toLocaleString()}</time></p>
          <div className="my-6 rounded-2xl bg-app-cream p-5">
            <p className="flex items-center gap-2 font-semibold"><CheckCircle2Icon className="size-5 text-app-green" />Demo order saved</p>
            <p className="mt-2 text-sm">Saved in this browser only. This order has not been sent to a store. Live delivery tracking is not available.</p>
          </div>
          <div className="rounded-2xl border border-app-border bg-white p-6">
            <h2 className="font-semibold">Your items</h2>
            <ul className="mt-4 divide-y divide-app-border">
              {order.items.map((item, index) => (
                <li key={index} className="flex justify-between gap-4 py-4">
                  <div className="min-w-0"><p className="break-words font-medium">{item.name}</p><p className="mt-1 text-sm text-app-text-light">{item.quantity} × {money(item.price)}</p></div>
                  <span className="shrink-0">{money(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <dl className="space-y-3 border-t border-app-border pt-4">
              <div className="flex justify-between"><dt>Subtotal</dt><dd>{money(order.subtotal)}</dd></div>
              <div className="flex justify-between"><dt>Delivery</dt><dd>{order.deliveryFee === 0 ? "Free" : money(order.deliveryFee)}</dd></div>
              <div className="flex justify-between font-semibold"><dt>Total</dt><dd>{money(order.total)}</dd></div>
            </dl>
          </div>
          <div className="mt-6 rounded-2xl border border-app-border bg-white p-6">
            <h2 className="font-semibold">Delivery details</h2>
            <p className="mt-4 font-medium">{order.customer.name}</p>
            <p className="mt-1">{order.customer.phone}</p>
            <p className="mt-2 whitespace-pre-line break-words">{order.customer.address}</p>
            {order.customer.notes && <p className="mt-3 whitespace-pre-line break-words"><span className="font-medium">Notes: </span>{order.customer.notes}</p>}
            <p className="mt-4 text-sm text-app-text-light">Cash on delivery · No payment collected</p>
          </div>
          <Link to="/products" className="mt-6 inline-block rounded-xl bg-app-green px-5 py-3 font-semibold text-white hover:bg-app-green-light">Continue shopping</Link>
        </>
      )}
    </section>
  );
};
export default OrderTracking;
