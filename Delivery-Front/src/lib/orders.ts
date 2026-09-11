export type Order = {
  id: string;
  createdAt: string;
  customer: { name: string; phone: string; address: string; notes: string };
  items: { productId: string | number; name: string; quantity: number; price: number }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  currency: string;
  paymentMethod: 'cash-on-delivery';
};

export function readOrders(): Order[] {
  const saved: unknown = JSON.parse(localStorage.getItem('app_orders') ?? '[]');
  if (!Array.isArray(saved) || !saved.every((order) =>
    order && typeof order.id === 'string' && typeof order.createdAt === 'string' &&
    typeof order.currency === 'string' && Number.isFinite(order.total) &&
    Number.isFinite(order.subtotal) && Number.isFinite(order.deliveryFee) &&
    order.customer && ['name', 'phone', 'address', 'notes'].every((key) => typeof order.customer[key] === 'string') &&
    Array.isArray(order.items) && order.items.every((item: Order['items'][number]) =>
      item && typeof item.name === 'string' && Number.isFinite(item.price) &&
      Number.isInteger(item.quantity) && item.quantity > 0))) {
    throw new Error('Saved orders could not be read.');
  }
  return saved;
}

export function saveOrder(order: Order) {
  const orders = readOrders();
  if (orders.some((saved) => saved.id === order.id)) return;
  localStorage.setItem('app_orders', JSON.stringify([order, ...orders]));
}
