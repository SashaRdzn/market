<!-- @ts-nocheck -->
<script>
	// @ts-nocheck
	import { slide } from 'svelte/transition';
	import ProductCard from '../../components/products/ProductCard.svelte';
	import { categories, products } from '$lib/data/products';
	import { cartStore } from '$lib/stores/cart';

	let search = '';
	let selectedCategory = 'Все';
	let sortOrder = 'asc';
	let minPrice = '';
	let maxPrice = '';
	let visibleCount = 6;
	let toast = '';

	const addToCart = (product) => {
		cartStore.addItem(product, 1);
		toast = `«${product.title}» добавлен в корзину`;
		setTimeout(() => (toast = ''), 2400);
	};

	$: filtered = products.filter((product) => {
		const byTitle = product.title.toLowerCase().includes(search.toLowerCase());
		const byCategory = selectedCategory === 'Все' || product.category === selectedCategory;
		const priceOk =
			(minPrice === '' || product.price >= Number(minPrice)) &&
			(maxPrice === '' || product.price <= Number(maxPrice));
		return byTitle && byCategory && priceOk;
	});

	$: sorted = [...filtered].sort((a, b) =>
		sortOrder === 'asc' ? a.price - b.price : b.price - a.price
	);

	$: paginated = sorted.slice(0, visibleCount);
</script>

<section class="page-section">
	<div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<p class="text-sm font-semibold uppercase tracking-wide text-brand-700">Каталог</p>
			<h1 class="text-3xl font-bold text-slate-900">Аксессуары для велосипеда</h1>
			<p class="mt-1 text-sm text-slate-600">Найдено: {sorted.length} товаров</p>
		</div>
		<a
			class="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100 transition hover:-translate-y-0.5 hover:shadow"
			href="/shopping-cart"
		>
			Перейти в корзину →
		</a>
	</div>

	<div class="card space-y-4 p-4 sm:p-5">
		<div class="grid gap-3 md:grid-cols-3">
			<label class="flex flex-col gap-2">
				<span class="text-sm font-semibold text-slate-700">Поиск</span>
				<input
					class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
					type="search"
					placeholder="Название товара"
					bind:value={search}
				/>
			</label>
			<label class="flex flex-col gap-2">
				<span class="text-sm font-semibold text-slate-700">Категория</span>
				<select
					class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
					bind:value={selectedCategory}
				>
					{#each categories as category}
						<option value={category}>{category}</option>
					{/each}
				</select>
			</label>
			<label class="flex flex-col gap-2">
				<span class="text-sm font-semibold text-slate-700">Сортировка по цене</span>
				<select
					class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
					bind:value={sortOrder}
				>
					<option value="asc">Сначала дешевле</option>
					<option value="desc">Сначала дороже</option>
				</select>
			</label>
		</div>
		<div class="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
			<label class="flex flex-col gap-2">
				<span class="text-sm font-semibold text-slate-700">Цена от</span>
				<input
					class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
					type="number"
					min="0"
					step="500"
					placeholder="0"
					bind:value={minPrice}
				/>
			</label>
			<label class="flex flex-col gap-2">
				<span class="text-sm font-semibold text-slate-700">Цена до</span>
				<input
					class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
					type="number"
					min="0"
					step="500"
					placeholder="15000"
					bind:value={maxPrice}
				/>
			</label>
			<div class="flex items-end">
				<button
					type="button"
					class="inline-flex w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:shadow-sm"
					onclick={() => {
						search = '';
						selectedCategory = 'Все';
						sortOrder = 'asc';
						minPrice = '';
						maxPrice = '';
					}}
				>
					Сбросить фильтры
				</button>
			</div>
		</div>
	</div>

	<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#if paginated.length === 0}
			<div class="card col-span-full p-12 text-center">
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
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</div>
				<p class="mb-2 text-lg font-semibold text-slate-900">Ничего не найдено</p>
				<p class="text-slate-500">Попробуйте изменить параметры поиска или фильтры.</p>
			</div>
		{:else}
			{#each paginated as product}
				<ProductCard product={product} on:add={() => addToCart(product)} />
			{/each}
		{/if}
	</div>

	{#if sorted.length > visibleCount}
		<div class="mt-8 flex justify-center">
			<button
				class="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:-translate-y-0.5 hover:bg-brand-700"
				onclick={() => (visibleCount += 3)}
			>
				Показать ещё
			</button>
		</div>
	{/if}
</section>

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
