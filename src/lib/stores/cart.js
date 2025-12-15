// @ts-nocheck
import { browser } from '$app/environment';
import { derived, writable } from 'svelte/store';

const STORAGE_KEY = 'bike-cart';

const readInitial = () => {
	if (!browser) return [];
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch (error) {
		console.warn('Не удалось прочитать корзину из localStorage', error);
		return [];
	}
};

const writeStorage = (items) => {
	if (!browser) return;
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
	} catch (error) {
		console.warn('Не удалось сохранить корзину', error);
	}
};

const cart = writable(readInitial());

if (browser) {
	cart.subscribe((items) => writeStorage(items));
}

const clampQty = (quantity, stock) => Math.max(1, Math.min(quantity, stock));

const addItem = (product, quantity = 1) => {
	cart.update((items) => {
		const existing = items.find((item) => item.product.id === product.id);
		if (existing) {
			const nextQuantity = clampQty(existing.quantity + quantity, product.stock ?? 9999);
			return items.map((item) =>
				item.product.id === product.id ? { ...item, quantity: nextQuantity } : item
			);
		}

		return [...items, { product, quantity: clampQty(quantity, product.stock ?? 9999) }];
	});
};

const removeItem = (productId) => {
	cart.update((items) => items.filter((item) => item.product.id !== productId));
};

const updateQuantity = (productId, quantity, stock = 9999) => {
	cart.update((items) =>
		items.map((item) =>
			item.product.id === productId ? { ...item, quantity: clampQty(quantity, stock) } : item
		)
	);
};

const clear = () => cart.set([]);

export const cartStore = {
	subscribe: cart.subscribe,
	addItem,
	removeItem,
	updateQuantity,
	clear
};

export const cartCount = derived(cart, (items) =>
	items.reduce((total, item) => total + Number(item.quantity || 0), 0)
);

export const cartTotal = derived(cart, (items) =>
	items.reduce((total, item) => total + item.product.price * item.quantity, 0)
);
