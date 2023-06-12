import { db } from '~/utils/db.server';
import type { ProductReview } from '@prisma/client';

export async function createProductReview(
	productReview: Pick<
		ProductReview,
		'title' | 'rating' | 'comment' | 'productId' | 'userId'
	>
) {
	const review = await db.productReview.create({
		data: productReview,
	});
	return review;
}

export async function getProductReviewByUserIdAndProductId(
	userId: string,
	productId: string
) {
	const review = await db.productReview.findFirst({
		where: {
			userId,
			productId,
		},
	});
	return review;
}
