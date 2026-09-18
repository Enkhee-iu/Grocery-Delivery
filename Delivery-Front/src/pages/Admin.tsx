import { useState, type FormEvent } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Bike, LayoutDashboard, Package, ShoppingBag, ArrowUpRight, Plus, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCatalog } from '$/context/CatalogContext';
import { type Product, products as defaults } from '$/data/products';
import { readOrders, orderStatuses, updateOrderStatus, type OrderStatus } from '$/lib/orders';

const input = 'w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm';
const button = 'inline-flex items-center justify-center gap-2 rounded-xl bg-green-950 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-800 disabled:opacity-50';
const money = (value: number, currency = import.meta.env.VITE_CURRENCY_SYMBOL || '$') => `${currency}${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
function useOrders() {
  const [result, setResult] = useState(() => {
    try { return { orders: readOrders(), error: '' }; }
    catch { return { orders: [], error: 'Orders could not be loaded. Check browser storage and reload.' }; }
  });
  return { ...result, setResult };
}
function Notice({ children }: { children: string }) {
  return <p role="alert" className="my-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">{children}</p>;
}
export function AdminLayout() {
  return <div className="min-h-screen bg-[#f6f7f4] text-zinc-900" style={{ colorScheme: 'light' }}>
    <aside className="border-b border-zinc-200 bg-white p-5 lg:fixed lg:inset-y-0 lg:w-60 lg:border-r">
      <Link to="/admin" className="flex items-center gap-2 text-xl font-semibold text-green-950"><Bike />Instacart <span className="rounded bg-orange-100 px-2 py-1 text-[10px] uppercase text-orange-700">Admin</span></Link>
      <p className="mb-4 mt-8 text-xs font-semibold uppercase tracking-widest text-zinc-400">Workspace</p>
      <nav aria-label="Admin navigation" className="flex flex-wrap gap-2 lg:flex-col">
        {[[ '/admin', 'Overview', LayoutDashboard ], [ '/admin/products', 'Products', Package ], [ '/admin/orders', 'Orders', ShoppingBag ]].map(([path, label, Icon]) => <NavLink key={String(path)} to={String(path)} end className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${isActive ? 'bg-green-950 text-white' : 'text-zinc-500 hover:bg-zinc-100'}`}><Icon size={18} />{String(label)}</NavLink>)}
      </nav>
      <Link to="/" className="mt-8 flex items-center gap-2 px-4 text-sm text-zinc-500"><ArrowUpRight size={16} />Back to store</Link>
    </aside>
    <div className="lg:pl-60">
      <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-5"><span className="text-sm text-zinc-500">Store management</span><span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700">Local demo</span></header>
      <main className="mx-auto max-w-7xl p-5 sm:p-8"><p className="mb-7 text-xs text-zinc-500">Demo workspace · Changes are saved in this browser only. Admin authentication is not connected.</p><Outlet /></main>
    </div>
  </div>;
}
export function AdminOverview() {
  const { products, error } = useCatalog();
  const { orders, error: orderError } = useOrders();
  const active = orders.filter(o => !['Delivered', 'Cancelled'].includes(o.status ?? 'Pending'));
  return <>
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4"><div><h1 className="font-semibold tracking-tight">Store overview</h1><p className="mt-2 text-sm text-zinc-500">A little clarity for your everyday operations.</p></div><Link to="/admin/products" className={button}><Plus size={16} />Manage products</Link></div>
    {error && <Notice>{error}</Notice>}{orderError && <Notice>{orderError}</Notice>}
    <div className="grid gap-4 sm:grid-cols-3">{[['Products', products.length, 'Items in your catalog'], ['Total orders', orders.length, 'Orders saved in this browser'], ['Active orders', active.length, 'Waiting to reach your customers']].map(([label, value, caption]) => <div key={label} className="rounded-2xl border border-zinc-200 bg-white p-6"><p className="text-sm text-zinc-500">{label}</p><p className="my-4 text-4xl font-semibold text-green-950">{value}</p><p className="text-xs text-zinc-400">{caption}</p></div>)}</div>
    <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6"><div className="flex justify-between gap-3"><h2 className="font-semibold">Recent orders</h2><Link to="/admin/orders" className="text-sm text-green-800 underline">View all</Link></div>{orders.length ? <div className="mt-4 divide-y">{orders.slice(0, 5).map(order => <Link to="/admin/orders" key={order.id} className="flex flex-wrap items-center justify-between gap-3 py-4"><div><p className="font-medium">{order.customer.name}</p><p className="mt-1 text-xs text-zinc-500">{new Date(order.createdAt).toLocaleDateString()} · {order.items.length} items</p></div><span className="text-sm text-zinc-500">{order.status ?? 'Pending'}</span><span className="font-medium">{money(order.total, order.currency)}</span></Link>)}</div> : <div className="py-14 text-center"><ShoppingBag className="mx-auto mb-4 text-zinc-300" size={36} /><p className="font-medium">Your first order starts here</p><p className="mt-2 text-sm text-zinc-500">Orders placed through the store will appear in this workspace.</p><Link to="/products" className="mt-5 inline-block text-sm text-green-800 underline">Visit store</Link></div>}</section>
  </>;
}
export function AdminProducts() {
  const { products, save, error } = useCatalog();
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [formError, setFormError] = useState('');
  const categories = [...new Set([...defaults.map(p => p.category), ...products.map(p => p.category)])];
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing) return;
    const cleaned = { ...editing, name: editing.name.trim() };
    if (!cleaned.name || !Number.isFinite(cleaned.price) || cleaned.price < 0 || !Number.isFinite(cleaned.originalPrice) || cleaned.originalPrice < cleaned.price || !Number.isFinite(cleaned.rating) || cleaned.rating < 0 || cleaned.rating > 5) { setFormError('Enter a name, valid prices (original price must be at least the selling price), and a rating from 0 to 5.'); return; }
    try { save(products.some(p => p.id === cleaned.id) ? products.map(p => p.id === cleaned.id ? cleaned : p) : [...products, cleaned]); setEditing(null); toast.success('Product saved'); }
    catch { setFormError('Could not save. Check browser storage and try again.'); }
  }
  const filtered = products.filter(p => `${p.name} ${p.category}`.toLowerCase().includes(search.toLowerCase()));
  return <>
    <div className="mb-7 flex items-center justify-between gap-4"><div><h1 className="font-semibold">Products</h1><p className="mt-2 text-sm text-zinc-500">Keep your shelves fresh and up to date.</p></div><button className={button} disabled={!!error} onClick={() => { setEditing({ id: Math.max(0, ...products.map(p => p.id)) + 1, name: '', price: 0, originalPrice: 0, rating: 0, category: 'Fruits', image: defaults[0].image }); setFormError(''); }}><Plus size={16} />Add product</button></div>
    {error && <Notice>{error}</Notice>}
    {editing && <form onSubmit={submit} className="mb-6 rounded-2xl border border-green-200 bg-white p-6"><h2 className="mb-5 font-semibold">{products.some(p => p.id === editing.id) ? 'Edit product' : 'New product'}</h2>{formError && <Notice>{formError}</Notice>}<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <label className="space-y-2 text-sm">Product name<input autoFocus required maxLength={120} className={input} value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} /></label>
      <label className="space-y-2 text-sm">Category<select className={input} value={editing.category} onChange={e => setEditing({ ...editing, category: e.target.value, image: defaults.find(p => p.category === e.target.value)?.image ?? editing.image })}>{categories.map(category => <option key={category}>{category}</option>)}</select></label>
      {(['price', 'originalPrice', 'rating'] as const).map(field => <label key={field} className="space-y-2 text-sm">{{ price: 'Selling price', originalPrice: 'Original price', rating: 'Rating' }[field]}<input required type="number" min="0" max={field === 'rating' ? 5 : undefined} step="0.01" className={input} value={editing[field]} onChange={e => setEditing({ ...editing, [field]: e.target.valueAsNumber })} /></label>)}
      <label className="space-y-2 text-sm">Product image<select className={input} value={editing.image} onChange={e => setEditing({ ...editing, image: e.target.value })}>{[...new Map(defaults.map(p => [p.image, p])).values()].map(p => <option key={p.image} value={p.image}>{p.category} image</option>)}</select></label>
    </div><div className="mt-5 flex gap-3"><button className={button}>Save product</button><button type="button" className="rounded-xl border px-4 py-2 text-sm" onClick={() => setEditing(null)}>Cancel</button></div></form>}
    <div className="rounded-2xl border border-zinc-200 bg-white"><div className="flex flex-wrap items-center justify-between gap-3 border-b p-5"><span className="text-sm font-medium">{filtered.length} products</span><input type="search" aria-label="Search products" className={`${input} sm:max-w-xs`} placeholder="Search products or categories…" value={search} onChange={e => setSearch(e.target.value)} /></div><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-zinc-50 text-xs uppercase text-zinc-500"><tr>{['Product', 'Category', 'Price', 'Rating', 'Actions'].map(label => <th key={label} className="px-5 py-4">{label}</th>)}</tr></thead><tbody className="divide-y">{filtered.map(product => <tr key={product.id}><td className="px-5 py-4"><div className="flex min-w-44 items-center gap-3"><img src={product.image} alt="" className="h-12 w-12 rounded-lg bg-orange-50 object-contain" /><span className="font-medium">{product.name}</span></div></td><td className="px-5 py-4 text-zinc-500">{product.category}</td><td className="whitespace-nowrap px-5 py-4">{money(product.price)}</td><td className="px-5 py-4">★ {product.rating}</td><td className="px-5 py-4">{deleting === product.id ? <div className="flex items-center gap-3"><span>Delete?</span><button className="text-red-700 underline" onClick={() => { try { save(products.filter(p => p.id !== product.id)); setDeleting(null); if (editing?.id === product.id) setEditing(null); toast.success('Product deleted'); } catch { toast.error('Could not delete product'); } }}>Confirm</button><button className="underline" onClick={() => setDeleting(null)}>Cancel</button></div> : <div className="flex gap-2"><button disabled={!!error} aria-label={`Edit ${product.name}`} className="rounded-lg p-2 hover:bg-zinc-100" onClick={() => { setEditing({ ...product }); setFormError(''); window.scrollTo({ top: 0 }); }}><Pencil size={16} /></button><button disabled={!!error} aria-label={`Delete ${product.name}`} className="rounded-lg p-2 text-red-600 hover:bg-red-50" onClick={() => setDeleting(product.id)}><Trash2 size={16} /></button></div>}</td></tr>)}</tbody></table></div>{!filtered.length && <p className="p-12 text-center text-sm text-zinc-500">No products found. Add a product or change your search.</p>}</div>
  </>;
}
export function AdminOrders() {
  const { orders, error, setResult } = useOrders();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const filtered = orders.filter(order => (!status || (order.status ?? 'Pending') === status) && `${order.id} ${order.customer.name} ${order.customer.phone}`.toLowerCase().includes(search.toLowerCase()));
  return <><h1 className="font-semibold">Orders</h1><p className="mt-2 text-sm text-zinc-500">From the first item to the final doorstep.</p>{error && <Notice>{error}</Notice>}<div className="my-6 flex flex-wrap gap-3"><input aria-label="Search orders" type="search" placeholder="Search customer, phone or order ID…" value={search} onChange={e => setSearch(e.target.value)} className={`${input} sm:max-w-sm`} /><select aria-label="Filter order status" value={status} onChange={e => setStatus(e.target.value)} className={`${input} sm:max-w-xs`}><option value="">All statuses</option>{orderStatuses.map(value => <option key={value}>{value}</option>)}</select></div>
    <div className="space-y-4">{filtered.map(order => <article key={order.id} className="rounded-2xl border border-zinc-200 bg-white p-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><h2 className="font-semibold">{order.customer.name}</h2><p className="mt-1 break-all text-xs text-zinc-500">{order.id} · {new Date(order.createdAt).toLocaleString()}</p></div><label className="text-xs text-zinc-500">Order status<select aria-label={`Status for order ${order.id}`} value={order.status ?? 'Pending'} className={`${input} mt-1`} onChange={e => { try { setResult({ orders: updateOrderStatus(order.id, e.target.value as OrderStatus), error: '' }); toast.success('Order status updated'); } catch { toast.error('Could not update order. Reload and try again.'); } }}>{orderStatuses.map(value => <option key={value}>{value}</option>)}</select></label></div><div className="mt-5 grid gap-6 border-t pt-5 md:grid-cols-2"><div className="text-sm text-zinc-500"><p className="font-medium text-zinc-900">Delivery details</p><p className="mt-2">{order.customer.phone}</p><p className="mt-1 whitespace-pre-line break-words">{order.customer.address}</p>{order.customer.notes && <p className="mt-2">Notes: {order.customer.notes}</p>}<p className="mt-3 text-xs">Cash on delivery · No payment collected</p></div><div><ul className="space-y-2 text-sm">{order.items.map((item, i) => <li key={i} className="flex justify-between gap-4"><span>{item.name} × {item.quantity}</span><span>{money(item.price * item.quantity, order.currency)}</span></li>)}</ul><p className="mt-3 flex justify-between text-sm text-zinc-500"><span>Delivery</span><span>{money(order.deliveryFee, order.currency)}</span></p><p className="mt-3 flex justify-between border-t pt-3 font-semibold"><span>Total</span><span>{money(order.total, order.currency)}</span></p></div></div></article>)}</div>{!filtered.length && !error && <div className="rounded-2xl border border-dashed border-zinc-300 p-14 text-center"><ShoppingBag className="mx-auto mb-4 text-zinc-400" /><h2>No orders found</h2><p className="mt-2 text-sm text-zinc-500">{search || status ? 'Try a different search or status.' : 'Place a demo order in the store to see it here.'}</p></div>}</>;
}
