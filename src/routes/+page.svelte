<!-- @ts-nocheck -->
<script>
	// @ts-nocheck
	import { slide } from 'svelte/transition';
	import ProductCard from '../components/products/ProductCard.svelte';
	import { popularProducts } from '$lib/data/products';
	import { cartStore } from '$lib/stores/cart';
	import { formatPrice } from '$lib/utils/format';

	let toast = '';

	const addToCart = (product) => {
		cartStore.addItem(product, 1);
		toast = `«${product.title}» добавлен в корзину`;
		setTimeout(() => (toast = ''), 2400);
	};
</script>

<section class="page-section">
	<div class="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
		<div class="space-y-6">
			<p class="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
				<span class="inline-block h-2 w-2 rounded-full bg-brand-500"></span>
				Готовимся к новому велосезону — успей обновить снаряжение
			</p>
			<h1 class="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
				Аксессуары, которые держат темп вашего велосипеда
				<span class="block text-brand-600">Bike Accessories</span>
			</h1>
			<p class="max-w-xl text-lg text-slate-600">
				Подборка надёжных шлемов, света, замков и сумок для города и трейла.
				Собираем только проверенные модели, чтобы вы думали о дороге, а не о снаряжении.
			</p>
			<div class="flex flex-wrap gap-3">
				<a
					href="/products"
					class="inline-flex items-center justify-center !text-white rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:-translate-y-0.5 hover:bg-brand-700"
					>К каталогу</a
				>
				<a
					href="/shopping-cart"
					class="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:shadow-lg"
					>В корзину</a
				>
			</div>
			<div class="flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center">
				<div class="flex items-center gap-2">
					<span class="h-2 w-2 rounded-full bg-emerald-500"></span>
					Доставка по РФ за 2–5 дней
				</div>
				<div class="flex items-center gap-2">
					<span class="h-2 w-2 rounded-full bg-emerald-500"></span>
					Гарантия 12 месяцев
				</div>
				<div class="flex items-center gap-2">
					<span class="h-2 w-2 rounded-full bg-emerald-500"></span>
					Поддержка 24/7
				</div>
			</div>
		</div>
		<div class="card relative overflow-hidden transition duration-300 hover:shadow-lg">
			<div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-500/10 via-brand-500/5 to-brand-500/20"></div>
			<div class="relative space-y-4 p-6">
				<p class="text-sm font-semibold text-brand-700">Хит недели</p>
				<h2 class="text-2xl font-bold text-slate-900">Шлем Breeze Pro</h2>
				<p class="text-slate-600">
					Лёгкий шлем с системой подгонки DialFit, 14 вентиляционными каналами и магнитной застёжкой.
					Идеален для городских поездок и длинных прогулок.
				</p>
				<div class="flex items-center justify-between">
					<span class="text-3xl font-bold text-slate-900">{formatPrice(7200)}</span>
					<a
						href="/products/helmet-01"
						class="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100 transition hover:-translate-y-0.5 hover:shadow"
					>
						Подробнее
						<span aria-hidden="true">→</span>
					</a>
				</div>
				<div class="grid grid-cols-3 gap-3 text-sm text-slate-600">
					<div class="rounded-xl bg-white/70 p-3">
						<p class="font-semibold text-slate-900">14</p>
						<p>вентканалов для охлаждения</p>
					</div>
					<div class="rounded-xl bg-white/70 p-3">
						<p class="font-semibold text-slate-900">320 г</p>
						<p>вес модели M/L</p>
					</div>
					<div class="rounded-xl bg-white/70 p-3">
						<p class="font-semibold text-slate-900">DialFit</p>
						<p>точная подгонка объёма</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="page-section">
	<div class="mb-6 flex items-center justify-between">
		<div>
			<p class="text-sm font-semibold uppercase tracking-wide text-brand-700">Популярное</p>
			<h2 class="text-2xl font-bold text-slate-900">Популярные товары</h2>
		</div>
		<a class="text-sm font-semibold text-brand-700 hover:text-brand-800 !text-white" href="/products">
			В каталог →
		</a>
	</div>
	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each popularProducts as product}
			<ProductCard product={product} on:add={() => addToCart(product)} />
		{/each}
	</div>
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
