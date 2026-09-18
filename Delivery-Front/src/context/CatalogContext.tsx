import { createContext, useContext, useState, type ReactNode } from 'react';
import { products as defaults, type Product } from '$/data/products';

const CatalogContext = createContext<{ products: Product[]; error: string; save: (products: Product[]) => void } | null>(null);
export function CatalogProvider({ children }: { children: ReactNode }) {
  const [initial] = useState(() => {
    try {
      const raw = localStorage.getItem('app_products');
      const saved: unknown = raw === null ? defaults : JSON.parse(raw);
      if (!Array.isArray(saved) || !saved.every(p => p && Number.isSafeInteger(p.id) &&
        typeof p.name === 'string' && p.name.trim() && typeof p.category === 'string' && typeof p.image === 'string' &&
        Number.isFinite(p.price) && p.price >= 0 && Number.isFinite(p.originalPrice) && p.originalPrice >= p.price &&
        Number.isFinite(p.rating) && p.rating >= 0 && p.rating <= 5) || new Set(saved.map(p => p.id)).size !== saved.length) throw new Error();
      return { products: saved as Product[], error: '' };
    } catch { return { products: defaults, error: 'Saved products could not be loaded. Check browser storage and reload before editing.' }; }
  });
  const [products, setProducts] = useState(initial.products);
  function save(next: Product[]) {
    if (initial.error) throw new Error(initial.error);
    localStorage.setItem('app_products', JSON.stringify(next));
    setProducts(next);
  }
  return <CatalogContext.Provider value={{ products, error: initial.error, save }}>{children}</CatalogContext.Provider>;
}
export function useCatalog() {
  const value = useContext(CatalogContext);
  if (!value) throw new Error('CatalogProvider is required');
  return value;
}
