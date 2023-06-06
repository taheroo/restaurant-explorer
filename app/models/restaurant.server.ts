import { db } from '~/utils/db.server';
import { calculateAverage } from '~/utils/math';

interface Query {
	name: string;
	cuisine: string;
	myRestaurants: string;
	userId: string;
}

export async function getRestaurants(query: Query) {
	let restaurants = await db.restaurant.findMany({
		include: {
			restaurantReviews: true,
		},
		where: {
			name: {
				contains: query.name,
			},
			cuisine: {
				contains: query.cuisine,
			},
			restaurantReviews: query.myRestaurants
				? { some: { userId: query.userId } }
				: undefined,
		},
	});

	restaurants = restaurants.map((restaurant) => {
		const ratings = restaurant.restaurantReviews.map((review) => review.rating);
		const average = calculateAverage(ratings);
		return {
			...restaurant,
			averageRating: average,
		};
	});
	return restaurants;
}

export async function getRestaurantById(restaurantId: string) {
	const restaurant = await db.restaurant.findUnique({
		where: { id: restaurantId },
		include: {
			restaurantReviews: {
				include: {
					user: true,
				},
			},
			products: {
				include: {
					productReviews: {
						include: {
							user: true,
						},
					},
				},
			},
		},
	});
	if (!restaurant) return null;
	// Sort reviews by rating
	restaurant?.products.map((product) => {
		return product.productReviews.sort((a, b) => {
			return b.rating - a.rating;
		});
	});

	restaurant.products =
		restaurant?.products.map((product) => {
			const ratings = product.productReviews.map((review) => review.rating);
			return {
				...product,
				averageRating: calculateAverage(ratings),
			};
		}) || [];
	return restaurant;
}
