import { db } from '~/utils/db.server';
import type { RestaurantReview } from '@prisma/client';

export async function createRestaurantReview(
	restaurantReview: Pick<
		RestaurantReview,
		'title' | 'rating' | 'comment' | 'restaurantId' | 'userId'
	>
) {
	const review = await db.restaurantReview.create({
		data: restaurantReview,
	});
	return review;
}
