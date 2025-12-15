<!-- @ts-nocheck -->
<script>
	// @ts-nocheck
	import { slide } from 'svelte/transition';
	import ProductCard from '../../../components/products/ProductCard.svelte';
	import { cartStore } from '$lib/stores/cart';
	import { formatPrice } from '$lib/utils/format';

	export let data;
	let quantity = 1;
	let toast = '';

	const addToCart = () => {
		cartStore.addItem(data.product, quantity);
		toast = `«${data.product.title}» добавлен в корзину`;
		setTimeout(() => (toast = ''), 2400);
	};
</script>

<section class="page-section">
	<div class="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
		<div class="card overflow-hidden">
			<img
				src={data.product.image}
				alt={data.product.title}
				class="h-full w-full object-cover transition duration-300 hover:scale-105"
			/>
		</div>
		<div class="space-y-4">
			<div class="flex items-center gap-3">
				<span class="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
					{data.product.category}
				</span>
				<span class="text-sm text-slate-500">ID: {data.product.id}</span>
			</div>
			<h1 class="text-3xl font-bold text-slate-900">{data.product.title}</h1>
			<p class="text-slate-600">{data.product.description}</p>
			<div class="flex items-center gap-6">
				<div>
					<p class="text-sm text-slate-500">Цена</p>
					<p class="text-3xl font-bold text-slate-900">{formatPrice(data.product.price)}</p>
				</div>
				<div>
					<p class="text-sm text-slate-500">В наличии</p>
					<p class="text-lg font-semibold text-emerald-600">{data.product.stock} шт.</p>
				</div>
			</div>
			<div class="flex flex-col gap-3 sm:flex-row sm:items-center">
				<div class="flex items-center rounded-full border border-slate-200 bg-white px-2 py-1 shadow-sm">
					<button
						class="px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:text-brand-700 hover:bg-brand-50 rounded-lg"
						type="button"
						onclick={() => (quantity = Math.max(1, quantity - 1))}
					>
						-
					</button>
					<input
						class="w-16 border-0 bg-transparent text-center text-sm font-semibold focus:ring-0"
						type="number"
						min="1"
						max={data.product.stock}
						bind:value={quantity}
					/>
					<button
						class="px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:text-brand-700 hover:bg-brand-50 rounded-lg"
						type="button"
						onclick={() => (quantity = Math.min(data.product.stock, quantity + 1))}
					>
						+
					</button>
				</div>
				<button
					class="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:-translate-y-0.5 hover:bg-brand-700"
					onclick={addToCart}
				>
					Добавить в корзину
				</button>
			</div>
		</div>
	</div>
</section>

{#if data.similar.length}
	<section class="page-section">
		<div class="mb-4 flex items-center justify-between">
			<h2 class="text-2xl font-bold text-slate-900">Похожие товары</h2>
			<a class="text-sm font-semibold text-brand-700 hover:text-brand-800" href="/products">
				В каталог →
			</a>
		</div>
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.similar as product}
				<ProductCard product={product} on:add={() => cartStore.addItem(product, 1)} />
			{/each}
		</div>
	</section>
{/if}

{#if toast}
	<div
		class="fixed bottom-6 right-6 z-50 rounded-xl bg-white px-4 py-3 text-sm shadow-lg ring-1 ring-slate-200"
		in:slide={{ axis: 'y', duration: 300 }}
		out:slide={{ axis: 'y', duration: 200 }}
	>
		<div class="flex items-center gap-2">
			<span class="h-2 w-2 rounded-full bg-brand-500"></span>
			{toast}
		</div>
	</div>
{/if}
