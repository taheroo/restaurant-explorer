import type { LoaderArgs, ActionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useOutletContext } from '@remix-run/react';
import { getUserByEmail } from '~/models/user.server';
import {
	createProductReview,
	getProductReviewByUserIdAndProductId,
} from '~/models/productReview.server';
import ReviewForm from '~/components/ReviewForm';

export const loader = async ({ params }: LoaderArgs) => {
	const { productId } = params;
	const user = await getUserByEmail('alice@gmail.com');
	if (!productId) return json({ error: 'Product not found' }, { status: 404 });
	if (!user) return json({ error: 'User not found' }, { status: 404 });
	const userId = user.id;
	const productReview = await getProductReviewByUserIdAndProductId(
		userId,
		productId
	);
	return json({ productReview, productId, userId });
};

export const action = async ({ request }: ActionArgs) => {
	const formData = await request.formData();

	const title = formData.get('title')?.toString();
	const comment = formData.get('comment')?.toString();
	const rating = formData.get('rating');
	const productId = formData.get('productId')?.toString();
	const userId = formData.get('userId')?.toString();
	if (!title || !comment || !rating || !productId || !userId)
		return new Response('Missing fields', { status: 400 });

	await createProductReview({
		title,
		comment,
		rating: Number(rating),
		productId,
		userId,
	});

	return null;
};

export default function ProductReview() {
	const { productReview, productId, userId } = useLoaderData();
	interface ContextType {
		open: boolean;
		setOpen: (open: boolean) => void;
	}
	const { open, setOpen } = useOutletContext<ContextType>();
	const handleClose = () => setOpen(false);
	const errorMessage = productReview
		? 'You have already created a review for this product'
		: '';

	return (
		<ReviewForm
			isOpen={open}
			userId={userId}
			targetReview={{
				name: 'productId',
				value: productId,
			}}
			handleClose={handleClose}
			errorMessage={errorMessage}
		/>
	);
}
