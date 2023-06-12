import type { LoaderArgs, ActionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useOutletContext } from '@remix-run/react';
import { getUserByEmail } from '~/models/user.server';
import {
	createRestaurantReview,
	getRestaurantReviewByUserIdAndRestaurantId,
} from '~/models/restaurantReview.server';

import ReviewForm from '~/components/ReviewForm';

export const loader = async ({ params }: LoaderArgs) => {
	const { restaurantId } = params;
	const user = await getUserByEmail('alice@gmail.com');
	if (!restaurantId)
		return json({ error: 'Restaurant not found' }, { status: 404 });
	if (!user) return json({ error: 'User not found' }, { status: 404 });
	const userId = user.id;
	const restaurantReview = await getRestaurantReviewByUserIdAndRestaurantId(
		userId,
		restaurantId
	);
	return json({ restaurantReview, restaurantId, userId });
};

export const action = async ({ request }: ActionArgs) => {
	const formData = await request.formData();

	const title = formData.get('title')?.toString();
	const comment = formData.get('comment')?.toString();
	const rating = formData.get('rating');
	const restaurantId = formData.get('restaurantId')?.toString();
	const userId = formData.get('userId')?.toString();
	if (!title || !comment || !rating || !restaurantId || !userId)
		return new Response('Missing fields', { status: 400 });

	await createRestaurantReview({
		title,
		comment,
		rating: Number(rating),
		restaurantId,
		userId,
	});

	return null;
};

export default function RestaurantReviewRoute() {
	const { restaurantReview, restaurantId, userId } = useLoaderData();
	interface ContextType {
		open: boolean;
		setOpenReviewForm: (open: boolean) => void;
	}
	const { open, setOpenReviewForm } = useOutletContext<ContextType>();
	const handleClose = () => setOpenReviewForm(false);
	const errorMessage = restaurantReview
		? 'You have already created a review for this restaurant'
		: '';

	return (
		<ReviewForm
			isOpen={open}
			userId={userId}
			targetReview={{
				name: 'restaurantId',
				value: restaurantId,
			}}
			handleClose={handleClose}
			errorMessage={errorMessage}
		/>
	);
}
