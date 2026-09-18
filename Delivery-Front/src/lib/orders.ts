export const orderStatuses = ['Pending', 'Preparing', 'Out for delivery', 'Delivered', 'Cancelled'] as const;
export type OrderStatus = typeof orderStatuses[number];
export type Order = {
  status?: OrderStatus;
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
    (order.status === undefined || orderStatuses.includes(order.status)) &&
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

export function updateOrderStatus(id: string, status: OrderStatus) {
  if (!orderStatuses.includes(status)) throw new Error('Invalid order status');
  const orders = readOrders();
  if (!orders.some(order => order.id === id)) throw new Error('Order not found');
  const updated = orders.map(order => order.id === id ? { ...order, status } : order);
  localStorage.setItem('app_orders', JSON.stringify(updated));
  return updated;
}
