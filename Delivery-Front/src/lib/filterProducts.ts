const categoryNames: Record<string, string> = {
  'fruits-vegetables': 'Fruits', 'dairy-eggs': 'Dairy', bakery: 'Bakery',
  beverages: 'Drinks', pantry: 'Pantry', snacks: 'Snacks', seafood: 'Sea Food',
  frozzenfoods: 'Frozen Foods', 'frozen-foods': 'Frozen Foods', personalcare: 'Personal Care',
};

type FilterableProduct = { name: string; category: string; price: number; originalPrice: number; rating: number };
export function filterProducts<T extends FilterableProduct>(products: T[], search: string, category: string, sort: string, dealsOnly = false): T[] {
  const query = search.trim().toLowerCase();
  const selectedCategory = categoryNames[category] ?? category;
  const result = products.filter(product =>
    (!query || `${product.name} ${product.category}`.toLowerCase().includes(query)) &&
    (!category || product.category === selectedCategory) &&
    (!dealsOnly || product.originalPrice > product.price));
  if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);
  if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);
  return result;
}
