export type Product = {
  id: string | number;
  name: string;
  price?: number;
  image?: string;
};

export type CartItem = { productId: string | number; quantity: number; product: Product };

export function readCart(): CartItem[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem("app_cart") ?? "[]");
    if (!Array.isArray(saved)) return [];
    return saved.filter((item): item is CartItem =>
      item && (typeof item.productId === "string" || typeof item.productId === "number") &&
      Number.isSafeInteger(item.quantity) && item.quantity > 0 &&
      item.product && item.product.id === item.productId && typeof item.product.name === "string" &&
      (item.product.price === undefined || (Number.isFinite(item.product.price) && item.product.price >= 0)) &&
      (item.product.image === undefined || typeof item.product.image === "string")
    );
  } catch {
    return [];
  }
}
