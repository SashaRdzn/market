import { getProductById, getSimilarByCategory } from '$lib/data/products';
import { error } from '@sveltejs/kit';

export const load = ({ params }) => {
	const product = getProductById(params.productId);

	if (!product) {
		throw error(404, 'Товар не найден');
	}

	const similar = getSimilarByCategory(params.productId, 4);

	return { product, similar };
};
