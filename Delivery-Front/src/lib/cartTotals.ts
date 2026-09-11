export function getCartTotals(subtotal: number, itemCount: number) {
  const roundedSubtotal = Math.round(subtotal * 100) / 100;
  const deliveryFee = itemCount === 0 || roundedSubtotal > 20 ? 0 : 1.99;
  return {
    subtotal: roundedSubtotal,
    deliveryFee,
    total: Math.round((roundedSubtotal + deliveryFee) * 100) / 100,
  };
}
