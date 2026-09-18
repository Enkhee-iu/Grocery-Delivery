import assert from 'node:assert/strict';
import { test } from 'node:test';
import { build } from 'esbuild';

const bundle = await build({ entryPoints: ['src/lib/orders.ts'], bundle: true, write: false, platform: 'node', format: 'esm' });
const { readOrders, updateOrderStatus } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
const order = { id: 'one', createdAt: '2026-09-18', customer: { name: 'Customer', phone: '123', address: 'Street', notes: '' }, items: [{ productId: 1, name: 'Banana', price: 10, quantity: 2 }], subtotal: 20, deliveryFee: 5, total: 25, currency: '$', paymentMethod: 'cash-on-delivery' };
let stored;
function setup(value = [order]) {
  stored = JSON.stringify(value);
  globalThis.localStorage = { getItem: () => stored, setItem: (_, value) => { stored = value; } };
}
test('supports old orders and persists status without changing order details', () => {
  setup();
  assert.equal(readOrders()[0].status, undefined);
  updateOrderStatus('one', 'Preparing');
  assert.deepEqual(readOrders(), [{ ...order, status: 'Preparing' }]);
});
test('rejects missing orders and invalid statuses without writing', () => {
  setup();
  const before = stored;
  assert.throws(() => updateOrderStatus('missing', 'Delivered'));
  assert.throws(() => updateOrderStatus('one', 'invalid'));
  assert.equal(stored, before);
});
test('does not overwrite corrupt storage or hide write failures', () => {
  setup([{ ...order, status: 'invalid' }]);
  const before = stored;
  assert.throws(() => updateOrderStatus('one', 'Delivered'));
  assert.equal(stored, before);
  setup();
  globalThis.localStorage.setItem = () => { throw new Error('Storage full'); };
  assert.throws(() => updateOrderStatus('one', 'Delivered'), /Storage full/);
  assert.deepEqual(readOrders(), [order]);
});
