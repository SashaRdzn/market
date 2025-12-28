<!-- @ts-nocheck -->
<script>
	// @ts-nocheck
	import { createEventDispatcher } from 'svelte';
	import { formatPrice } from '$lib/utils/format';
	import { Button } from 'flowbite-svelte';

	export let product;

	const dispatch = createEventDispatcher();

	const handleAdd = () => dispatch('add', { product });
</script>

<article
	class="card group relative overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-brand-200/80"
>
	<div
		class="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-500/0 via-brand-500/0 to-brand-500/10 opacity-0 transition group-hover:opacity-100"
	></div>
	<div class="aspect-[4/3] overflow-hidden">
		<img
			src={product.image}
			alt={product.title}
			class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
		/>
	</div>
	<div class="space-y-3 p-4">
		<div class="flex items-center justify-between">
			<span class="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
				{product.category}
			</span>
			<span class="text-sm text-slate-500">Остаток: {product.stock}</span>
		</div>
		<h3 class="text-lg font-semibold text-slate-900">{product.title}</h3>
		<p class="text-sm text-slate-600 line-clamp-2">{product.description}</p>
		<div class="flex items-center justify-between pt-2">
			<div class="text-xl font-bold text-slate-900">{formatPrice(product.price)}</div>
			<div class="flex items-center gap-2">
				<Button size="sm" color="light" tag="a" href={`/products/${product.id}`}>Подробнее</Button>
				<Button size="sm" color="blue" onclick={handleAdd}>В корзину</Button>
			</div>
		</div>
	</div>
</article>
