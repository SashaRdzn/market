<!-- @ts-nocheck -->
<script>
	// @ts-nocheck
	import { createEventDispatcher } from 'svelte';
	import { formatPrice } from '$lib/utils/format';
	import { Button } from 'flowbite-svelte';

	export let item;
	const dispatch = createEventDispatcher();

	const changeQty = (next) =>
		dispatch('update', {
			id: item.product.id,
			quantity: Math.max(1, Math.min(next, item.product.stock))
		});

	const handleInput = (event) => {
		const value = parseInt(event.target.value, 10);
		changeQty(Number.isNaN(value) ? 1 : value);
	};

	const decrement = () => changeQty(item.quantity - 1);
	const increment = () => changeQty(item.quantity + 1);
	const remove = () => dispatch('remove', { id: item.product.id });
</script>

<div class="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
	<div class="flex items-center gap-3 sm:w-1/2">
		<div class="h-20 w-24 overflow-hidden rounded-xl bg-slate-100">
			<img src={item.product.image} alt={item.product.title} class="h-full w-full object-cover" />
		</div>
		<div class="space-y-1">
			<h3 class="font-semibold text-slate-900">{item.product.title}</h3>
			<p class="text-sm text-slate-500">В наличии: {item.product.stock} шт.</p>
			<p class="text-sm font-semibold text-brand-700">{formatPrice(item.product.price)}</p>
		</div>
	</div>
	<div class="flex flex-1 flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-end">
		<div class="flex items-center rounded-full border border-slate-200 bg-white px-2 py-1 shadow-sm">
			<Button color="light" size="xs" onclick={decrement}>-</Button>
			<input
				class="w-16 border-0 bg-transparent text-center text-sm font-semibold focus:ring-0"
				type="number"
				min="1"
				max={item.product.stock}
				value={item.quantity}
				oninput={handleInput}
			/>
			<Button color="light" size="xs" onclick={increment}>+</Button>
		</div>
		<div class="text-right">
			<p class="text-sm text-slate-500">Сумма</p>
			<p class="text-lg font-bold text-slate-900">
				{formatPrice(item.product.price * item.quantity)}
			</p>
		</div>
		<Button color="red" size="xs" onclick={remove}>Удалить</Button>
	</div>
</div>
