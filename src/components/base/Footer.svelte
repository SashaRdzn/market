<script>
	const year = new Date().getFullYear();
</script>

<footer class="mt-10 bg-slate-900 text-slate-100">
	<div class="mx-auto max-w-6xl px-4 py-10 sm:py-12">
		<div class="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
			<div>
				<div class="flex items-center gap-3">
					<div class="grid h-10 w-10 place-items-center rounded-xl bg-brand-500 font-bold text-white">
						BA
					</div>
					<div>
						<p class="text-lg font-semibold">Bike Accessories</p>
						<p class="text-sm text-slate-300">
							Интернет-магазин велосипедных аксессуаров для города и приключений.
						</p>
					</div>
				</div>
			</div>
			<div class="grid grid-cols-2 gap-6 text-sm sm:grid-cols-3">
				<div class="space-y-2">
					<h3 class="font-semibold text-slate-100">Навигация</h3>
					<a class="block hover:text-white" href="/">Главная</a>
					<a class="block hover:text-white" href="/products">Каталог</a>
					<a class="block hover:text-white" href="/shopping-cart">Корзина</a>
				</div>
				<div class="space-y-2">
					<h3 class="font-semibold text-slate-100">Аккаунт</h3>
					<a class="block hover:text-white" href="/auth/login">Войти</a>
					<a class="block hover:text-white" href="/auth/registration">Регистрация</a>
					<a class="block hover:text-white" href="/products">Новинки</a>
				</div>
				<div class="space-y-2">
					<h3 class="font-semibold text-slate-100">Контакты</h3>
					<p class="text-slate-300">support@bike-accessories.ru</p>
					<p class="text-slate-300">+7 (999) 123-45-67</p>
				</div>
			</div>
		</div>
		<div class="mt-8 border-t border-white/10 pt-6 text-sm text-slate-400">
			© {year} Bike Accessories. Все права защищены.
		</div>
	</div>
</footer>
