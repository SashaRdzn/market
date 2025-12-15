<script>
	import '../app.css';
	import Footer from '../components/base/Footer.svelte';
	import Navbar from '../components/base/Navbar.svelte';
	import favicon from '$lib/assets/favicon.svg';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Bike Accessories — магазин велосипедных аксессуаров</title>
</svelte:head>

<div class="min-h-screen bg-slate-50 text-slate-900">
	<Navbar />
	<main class="mx-auto max-w-6xl px-4">
		<slot />
	</main>
	<Footer />
</div>
