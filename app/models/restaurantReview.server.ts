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

export async function getRestaurantReviewByUserIdAndRestaurantId(
	userId: string,
	restaurantId: string
) {
	const review = await db.restaurantReview.findFirst({
		where: {
			userId,
			restaurantId,
		},
	});
	return review;
}
