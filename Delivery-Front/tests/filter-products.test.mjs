import assert from 'node:assert/strict';
import { test } from 'node:test';
import { build } from 'esbuild';
const bundle = await build({ entryPoints: ['src/lib/filterProducts.ts'], bundle: true, write: false, platform: 'node', format: 'esm' });
const { filterProducts } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
const products = [
  { name: 'Banana', category: 'Fruits', price: 3, originalPrice: 4, rating: 4.8 },
  { name: 'Milk', category: 'Dairy', price: 2, originalPrice: 2, rating: 4.9 },
  { name: 'Apple', category: 'Fruits', price: 1, originalPrice: 2, rating: 4.7 },
];
test('search ignores surrounding whitespace and case', () => {
  assert.deepEqual(filterProducts(products, '  BANANA ', '', ''), [products[0]]);
});
test('category links and search combine', () => {
  assert.deepEqual(filterProducts(products, 'apple', 'fruits-vegetables', ''), [products[2]]);
  assert.deepEqual(filterProducts(products, 'milk', 'fruits-vegetables', ''), []);
  assert.deepEqual(filterProducts(products, '', 'dairy-eggs', ''), [products[1]]);
});
test('sorts results without mutating the catalog', () => {
  const before = [...products];
  assert.deepEqual(filterProducts(products, '', '', 'price-asc'), [products[2], products[1], products[0]]);
  assert.deepEqual(filterProducts(products, '', '', 'price-desc'), [products[0], products[1], products[2]]);
  assert.deepEqual(filterProducts(products, '', '', 'rating'), [products[1], products[0], products[2]]);
  assert.deepEqual(products, before);
});
test('deals excludes regular-price products and honors search', () => {
  assert.deepEqual(filterProducts(products, '', '', '', true), [products[0], products[2]]);
  assert.deepEqual(filterProducts(products, 'milk', '', '', true), []);
});
test('unknown categories return no unrelated products', () => {
  assert.deepEqual(filterProducts(products, '', 'unknown', ''), []);
});
