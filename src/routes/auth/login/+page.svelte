<!-- @ts-nocheck -->
<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { authStore } from '$lib/stores/auth';

	let email = '';
	let password = '';
	let errors = {};
	let message = '';

	const validate = () => {
		const nextErrors = {};
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			nextErrors.email = 'Введите корректный email';
		}
		if (!password || password.length < 6) {
			nextErrors.password = 'Пароль должен быть не короче 6 символов';
		}
		errors = nextErrors;
		return Object.keys(nextErrors).length === 0;
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!validate()) return;

		const result = authStore.login({ email, password });
		if (!result.ok) {
			message = result.message;
			return;
		}

		message = 'Успешный вход';
		const redirect = $page.url.searchParams.get('redirect') ?? '/';
		setTimeout(() => goto(redirect), 500);
	};
</script>

<section class="page-section">
	<div class="mx-auto max-w-xl">
		<div class="card space-y-6 p-6 sm:p-8">
			<div>
				<p class="text-sm font-semibold uppercase tracking-wide text-brand-700">Авторизация</p>
				<h1 class="text-3xl font-bold text-slate-900">Вход</h1>
				<p class="mt-1 text-sm text-slate-500">
					Введите email и пароль, указанные при регистрации. Все данные хранятся в localStorage.
				</p>
			</div>
			<form class="space-y-4" onsubmit={handleSubmit} novalidate>
				<div class="space-y-2">
					<label class="text-sm font-semibold text-slate-700" for="email">Email</label>
					<input
						id="email"
						class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
						type="email"
						placeholder="you@example.com"
						bind:value={email}
					/>
					{#if errors.email}
						<p class="text-sm text-red-600">{errors.email}</p>
					{/if}
				</div>
				<div class="space-y-2">
					<label class="text-sm font-semibold text-slate-700" for="password">Пароль</label>
					<input
						id="password"
						class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
						type="password"
						minlength="6"
						placeholder="Пароль"
						bind:value={password}
					/>
					{#if errors.password}
						<p class="text-sm text-red-600">{errors.password}</p>
					{/if}
				</div>
				<button
					class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:-translate-y-0.5 hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
					type="submit"
					disabled={!email || !password}
				>
					Войти
				</button>
				<p class="text-sm text-slate-500">
					Нет аккаунта?
					<a class="font-semibold text-brand-700 hover:text-brand-800" href="/auth/registration">
						Зарегистрироваться
					</a>
				</p>
			</form>
			{#if message}
				<div
					class="rounded-lg px-4 py-3 text-sm {message.includes('Успешный') ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}"
				>
					{message}
				</div>
			{/if}
		</div>
	</div>
</section>
