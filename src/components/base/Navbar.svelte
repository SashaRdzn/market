<!-- @ts-nocheck -->
<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { cartCount } from '$lib/stores/cart';
	import { authStore } from '$lib/stores/auth';
	import { Button } from 'flowbite-svelte';

	const links = [
		{ href: '/', label: 'Главная' },
		{ href: '/products', label: 'Каталог' },
		{ href: '/shopping-cart', label: 'Корзина' }
	];

	const isActive = (path, href) => path === href || (href !== '/' && path.startsWith(href));

	const handleLogout = () => {
		authStore.logout();
		goto('/');
	};

	let mobileMenuOpen = false;

	const toggleMobileMenu = () => {
		mobileMenuOpen = !mobileMenuOpen;
	};
</script>

<nav class="border-b border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<!-- Brand -->
			<a href="/" class="flex items-center gap-3 text-brand-700 hover:text-brand-800">
				<div class="grid h-10 w-10 place-items-center rounded-xl bg-brand-100 font-bold text-brand-700">
					BA
				</div>
				<div class="flex flex-col">
					<span class="text-lg font-semibold">Bike Accessories</span>
					<span class="text-xs text-slate-500">Велоаксессуары и безопасность</span>
				</div>
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex md:items-center md:space-x-2">
				{#each links as link}
					<a
						href={link.href}
						aria-current={isActive($page.url.pathname, link.href) ? 'page' : undefined}
						class={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
							isActive($page.url.pathname, link.href)
								? 'bg-brand-100 text-brand-700 font-semibold'
								: 'text-slate-700 hover:bg-slate-100'
						}`}
					>
						{link.label}
					</a>
				{/each}
			</div>

			<!-- Right side buttons -->
			<div class="flex items-center gap-3">
				{#if $authStore.user}
					<span class="hidden text-sm text-slate-600 sm:block">Привет, {$authStore.user.name}</span>
					<Button size="sm" color="alternative" onclick={handleLogout}>Выйти</Button>
				{:else}
					<Button size="sm" color="light" tag="a" href="/auth/login">Войти</Button>
				{/if}
				<Button
					size="sm"
					color="blue"
					tag="a"
					href="/shopping-cart"
					class="relative"
					aria-label="Корзина"
				>
					<span>Корзина</span>
					{#if $cartCount > 0}
						<span
							class="absolute -right-2 -top-2 min-w-[1.5rem] rounded-full bg-brand-600 px-1 text-center text-xs font-semibold text-white"
						>
							{$cartCount}
						</span>
					{/if}
				</Button>

				<!-- Mobile menu button -->
				<button
					type="button"
					class="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 md:hidden"
					aria-controls="mobile-menu"
					aria-expanded={mobileMenuOpen}
					onclick={toggleMobileMenu}
				>
					<span class="sr-only">Открыть главное меню</span>
					{#if mobileMenuOpen}
						<svg
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					{:else}
						<svg
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
							/>
						</svg>
					{/if}
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile menu -->
	{#if mobileMenuOpen}
		<div class="border-t border-slate-200 md:hidden" id="mobile-menu">
			<div class="space-y-1 px-2 pb-3 pt-2">
				{#each links as link}
					<a
						href={link.href}
						aria-current={isActive($page.url.pathname, link.href) ? 'page' : undefined}
						class={`block rounded-lg px-3 py-2 text-base font-medium transition-colors ${
							isActive($page.url.pathname, link.href)
								? 'bg-brand-100 text-brand-700 font-semibold'
								: 'text-slate-700 hover:bg-slate-100'
						}`}
						onclick={() => (mobileMenuOpen = false)}
					>
						{link.label}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</nav>
