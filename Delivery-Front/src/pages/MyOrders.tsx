import { useState } from "react";
import { Link } from "react-router-dom";
import { readOrders } from "$/lib/orders";

const MyOrders = () => {
  const [result] = useState(() => {
    try { return { orders: readOrders(), error: "" }; }
    catch { return { orders: [], error: "Saved orders could not be loaded. Please check your browser storage and reload." }; }
  });

  return (
    <section className="mx-auto max-w-4xl px-5 py-10 text-app">
      <h1 className="font-semibold">My Orders</h1>
      <p className="mt-2 text-app-text-light">Demo orders saved in this browser. These have not been sent to a store.</p>
      {result.error ? <p role="alert" className="mt-6 text-red-700">{result.error}</p> : result.orders.length === 0 ? (
        <p className="mt-8">You have no orders yet. <Link to="/" className="font-medium underline">Start shopping</Link></p>
      ) : (
        <div className="mt-8 space-y-6">
          {result.orders.map((order) => (
            <article key={order.id} className="rounded-2xl border border-app-border bg-white p-6">
              <h2 className="break-all text-base font-semibold">Order {order.id}</h2>
              <p className="mt-1 text-sm text-app-text-light">{new Date(order.createdAt).toLocaleString()} · Saved locally</p>
              <ul className="my-4 divide-y divide-app-border">
                {order.items.map((item, index) => <li key={index} className="flex justify-between gap-4 py-3"><span>{item.name} × {item.quantity}</span><span>{order.currency}{(item.price * item.quantity).toFixed(2)}</span></li>)}
              </ul>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between"><dt>Delivery</dt><dd>{order.deliveryFee === 0 ? "Free" : `${order.currency}${order.deliveryFee.toFixed(2)}`}</dd></div>
                <div className="flex justify-between font-semibold"><dt>Total</dt><dd>{order.currency}{order.total.toFixed(2)}</dd></div>
              </dl>
              <div className="mt-4 border-t border-app-border pt-4 text-sm">
                <p className="font-medium">{order.customer.name} · {order.customer.phone}</p>
                <p className="mt-1 whitespace-pre-line break-words">{order.customer.address}</p>
                {order.customer.notes && <p className="mt-2 whitespace-pre-line break-words">Notes: {order.customer.notes}</p>}
                <p className="mt-2 text-app-text-light">Cash on delivery · No payment collected</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyOrders;
