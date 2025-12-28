<!-- @ts-nocheck -->
<script>
	// @ts-nocheck
	import ProductItem from '../../components/shopping-cart/ProductItem.svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { cartStore, cartTotal } from '$lib/stores/cart';
	import { authStore } from '$lib/stores/auth';
	import { formatPrice } from '$lib/utils/format';
	import { Button, Modal } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	let checkoutOpen = false;

	onMount(() => {
		if (browser && !$authStore.user) {
			goto('/auth/login?redirect=/shopping-cart');
		}
	});

	const handleUpdate = ({ detail }) => {
		const item = $cartStore.find((i) => i.product.id === detail.id);
		cartStore.updateQuantity(detail.id, detail.quantity, item?.product.stock ?? 9999);
	};

	const handleRemove = ({ detail }) => {
		cartStore.removeItem(detail.id);
	};

	const handleCheckout = () => {
		checkoutOpen = true;
	};
	const handleClear = () => cartStore.clear();
</script>

<section class="page-section">
	<div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<p class="text-sm font-semibold uppercase tracking-wide text-brand-700">Корзина</p>
			<h1 class="text-3xl font-bold text-slate-900">Ваши товары</h1>
			<p class="mt-1 text-sm text-slate-500">
				Аккаунт: {$authStore.user?.email ?? 'не авторизован'}
			</p>
		</div>
		{#if $cartStore.length}
			<Button color="light" size="sm" onclick={handleClear}>Очистить корзину</Button>
		{/if}
	</div>

	{#if $cartStore.length === 0}
		<div class="card p-12 text-center">
			<div class="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-slate-100">
				<svg
					class="h-8 w-8 text-slate-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
					/>
				</svg>
			</div>
			<p class="mb-2 text-lg font-semibold text-slate-900">Корзина пуста</p>
			<p class="mb-6 text-slate-500">Добавьте товары из каталога, чтобы оформить заказ.</p>
			<a
				href="/products"
				class="inline-flex !text-white items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:-translate-y-0.5 hover:bg-brand-700"
			>
				Перейти в каталог
			</a>
		</div>
	{:else}
		<div class="space-y-4">
			{#each $cartStore as item (item.product.id)}
				<ProductItem item={item} on:update={handleUpdate} on:remove={handleRemove} />
			{/each}
		</div>
		<div class="mt-6 grid gap-4 sm:grid-cols-[2fr_1fr]">
			<div class="card space-y-3 p-5">
				<h2 class="text-xl font-semibold text-slate-900">Промокод</h2>
				<p class="text-sm text-slate-500">Пока без логики бэкенда, пока для кайфа)))</p>
				<input
					class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
					placeholder="Введите промокод"
				/>
			</div>
			<div class="card space-y-4 p-5">
				<h2 class="text-lg font-semibold text-slate-900">Итоги заказа</h2>
				<div class="space-y-2 border-t border-slate-200 pt-4">
					<div class="flex items-center justify-between text-sm text-slate-500">
						<span>Позиции</span>
						<span class="font-semibold text-slate-700">{$cartStore.length} шт.</span>
					</div>
					<div class="flex items-center justify-between border-t border-slate-200 pt-3 text-xl font-bold text-slate-900">
						<span>Итого</span>
						<span class="text-brand-600">{formatPrice($cartTotal)}</span>
					</div>
				</div>
				<Button color="blue" class="w-full" onclick={handleCheckout}>Оформить заказ</Button>
			</div>
		</div>
	{/if}
</section>

<Modal bind:open={checkoutOpen} size="md">
	<svelte:fragment slot="header">
		<h3 class="text-lg font-semibold text-slate-900">Подтверждение заказа</h3>
	</svelte:fragment>
	<div class="space-y-3">
		<p class="text-sm text-slate-600">Позиции: {$cartStore.length}</p>
		<p class="text-sm text-slate-600">Сумма: {formatPrice($cartTotal)}</p>
		<p class="text-sm text-slate-500">
			Дальше могла бы быть интеграция с оплатой и доставкой. Пока просто окно-замок для
			проверки интерфейса корзины.
		</p>
	</div>
	<svelte:fragment slot="footer">
		<div class="flex w-full justify-end gap-2">
			<Button color="light" onclick={() => (checkoutOpen = false)}>Закрыть</Button>
			<Button color="blue" onclick={() => (checkoutOpen = false)}>Подтвердить</Button>
		</div>
	</svelte:fragment>
</Modal>
