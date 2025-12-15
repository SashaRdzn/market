// @ts-nocheck
export const products = [
	{
		id: 'helmet-01',
		title: 'Шлем Breeze Pro',
		description:
			'Легкий городской шлем с 14 вентиляционными каналами, магнитной застёжкой и системой подгонки DialFit.',
		price: 7200,
		category: 'Шлемы',
		image: '/products/helmet.svg',
		stock: 15
	},
	{
		id: 'lock-01',
		title: 'Цепной замок ChainGuard',
		description:
			'Закалённая сталь 8 мм, защита от перекусывания, тканевый чехол от царапин, рейтинг безопасности A+.',
		price: 3100,
		category: 'Защита',
		image: '/products/lock.svg',
		stock: 32
	},
	{
		id: 'light-01',
		title: 'Фара NightBeam 800',
		description:
			'Яркость 800 лм, зарядка USB-C, 4 режима, влагозащита IPX6, крепление без инструмента.',
		price: 4200,
		category: 'Освещение',
		image: '/products/light.svg',
		stock: 24
	},
	{
		id: 'bag-01',
		title: 'Сумка Handlebar Cargo',
		description:
			'Водоотталкивающая нейлоновая сумка на руль объёмом 7 л, MOLLE-петли и съёмный ремень через плечо.',
		price: 5900,
		category: 'Багаж',
		image: '/products/bag.svg',
		stock: 18
	},
	{
		id: 'pump-01',
		title: 'Мини-насос RoadMini',
		description:
			'Компактный насос до 120 PSI, алюминиевый корпус, гибкий шланг и совместимость с Presta/Schrader.',
		price: 2700,
		category: 'Инструменты',
		image: '/products/pump.svg',
		stock: 20
	},
	{
		id: 'toolkit-01',
		title: 'Мультитул TrailFix 15',
		description:
			'15 функций: шестигранники, торкс, отвёртки, съёмник звена цепи, ключи для спиц; сталь Cr-V.',
		price: 3400,
		category: 'Инструменты',
		image: '/products/toolkit.svg',
		stock: 26
	},
	{
		id: 'pedals-01',
		title: 'Педали GripFlow',
		description:
			'Лёгкие алюминиевые педали с 10 сменными шипами, широкой платформой и промподшипниками.',
		price: 2600,
		category: 'Компоненты',
		image: '/products/pedals.svg',
		stock: 30
	},
	{
		id: 'rack-01',
		title: 'Багажник CargoLite',
		description:
			'Алюминиевый багажник до 25 кг, совместим с дисковыми тормозами, быстрая регулировка по колесу.',
		price: 4800,
		category: 'Багаж',
		image: '/products/rack.svg',
		stock: 12
	},
	{
		id: 'light-02',
		title: 'Габарит CityLine 500',
		description:
			'Задний свет 500 лм с датчиком торможения, 6 режимов, влагозащита IPX5, зарядка USB-C.',
		price: 3500,
		category: 'Освещение',
		image: '/products/light.svg',
		stock: 28
	},
	{
		id: 'helmet-02',
		title: 'Шлем Urban Air',
		description:
			'Городской шлем с расширенной защитой висков, магнитной застёжкой Fidlock и съёмными накладками.',
		price: 6500,
		category: 'Шлемы',
		image: '/products/helmet.svg',
		stock: 22
	}
];

export const categories = ['Все', ...new Set(products.map((p) => p.category))];

export const popularProducts = products.slice(0, 6);

export const getProductById = (id) => products.find((p) => p.id === id);

export const getSimilarByCategory = (productId, limit = 4) => {
	const product = getProductById(productId);
	if (!product) return [];

	return products
		.filter((item) => item.category === product.category && item.id !== product.id)
		.slice(0, limit);
};
