import assert from 'node:assert/strict';
import { test } from 'node:test';
import { build } from 'esbuild';

const bundle = await build({ entryPoints: ['src/lib/cartStorage.ts'], bundle: true, write: false, platform: 'node', format: 'esm' });
const { readCart } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
const validItem = { productId: 1, quantity: 2, product: { id: 1, name: 'Apples', price: 3 } };

function setSaved(value) {
  globalThis.localStorage = { getItem: () => value };
}

test('restores valid cart items', () => {
  setSaved(JSON.stringify([validItem]));
  assert.deepEqual(readCart(), [validItem]);
});

test('recovers from missing, malformed, or non-array storage', () => {
  for (const value of [null, '{broken', '{}', 'null', '42']) {
    setSaved(value);
    assert.deepEqual(readCart(), []);
  }
});

test('keeps valid items while filtering invalid entries', () => {
  setSaved(JSON.stringify([validItem, null, {}, { ...validItem, quantity: -1 }, { ...validItem, quantity: 1.5 }, { ...validItem, product: null }, { ...validItem, product: { ...validItem.product, price: '3' } }, { ...validItem, productId: 2 }]));
  assert.deepEqual(readCart(), [validItem]);
});

test('does not crash when storage access is blocked', () => {
  globalThis.localStorage = { getItem: () => { throw new Error('Access denied'); } };
  assert.deepEqual(readCart(), []);
});
