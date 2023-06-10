import { useState } from 'react';
import type { LoaderArgs, ActionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { Product } from '@prisma/client';
import { getRestaurantById } from '~/models/restaurant.server';
import { createProductReview } from '~/models/productReview.server';
import { createRestaurantReview } from '~/models/restaurantReview.server';
import { getUserByEmail } from '~/models/user.server';
import ReviewForm from '~/components/ReviewForm';
import ReviewsList from '~/components/ReviewsList';
import ProductCard from '~/components/ProductCard';
import RestaurantDetailsHeader from '~/components/RestaurantDetailsHeader';
import BackNavigation from '~/components/BackNavigation';
interface ProductWithRating extends Product {
	averageRating: number;
	productReviews?: any;
}

export const loader = async ({ params }: LoaderArgs) => {
	const { restaurantId } = params;
	if (!restaurantId)
		return json({ error: 'Restaurant not found' }, { status: 404 });
	const restaurant = await getRestaurantById(restaurantId);
	const user = await getUserByEmail('alice@gmail.com');
	return json({ restaurant, user });
};

export const action = async ({ request }: ActionArgs) => {
	const formData = await request.formData();

	const title = formData.get('title')?.toString();
	const comment = formData.get('comment')?.toString();
	const rating = formData.get('rating');
	const productId = formData.get('productId')?.toString();
	const userId = formData.get('userId')?.toString();
	const restaurantId = formData.get('restaurantId')?.toString();
	if (productId) {
		if (!title || !comment || !rating || !productId || !userId)
			return new Response('Missing fields', { status: 400 });

		await createProductReview({
			title,
			comment,
			rating: Number(rating),
			productId,
			userId,
		});
	}
	if (restaurantId) {
		if (!title || !comment || !rating || !restaurantId || !userId)
			return new Response('Missing fields', { status: 400 });

		await createRestaurantReview({
			title,
			comment,
			rating: Number(rating),
			userId,
			restaurantId,
		});
	}

	return null;
};

export default function RestaurantDetailsRoute() {
	const { restaurant, user } = useLoaderData();
	const connectedUserId = user.id;

	const [open, setOpen] = useState(false);
	const [openRestaurantReviewForm, setOpenRestaurantReviewForm] =
		useState(false);
	const [openProductReviews, setOpenProductReviews] = useState(false);
	const [openRestaurantReviews, setOpenRestaurantReviews] = useState(false);
	const [selectedProduct, setSelectedProduct] =
		useState<ProductWithRating | null>(null);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const handleClickOpenRestaurantReviewForm = () => {
		setOpenRestaurantReviewForm(true);
	};
	const handleCloseRestaurantReviewForm = () => {
		setOpenRestaurantReviewForm(false);
	};
	const handleClickOpenProductReviews = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
		event.stopPropagation();
		setOpenProductReviews(true);
	};
	const handleCloseProductReviews = () => {
		setOpenProductReviews(false);
	};
	const handleClickOpenRestaurantReviews = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
		event.stopPropagation();
		setOpenRestaurantReviews(true);
	};
	const handleCloseRestaurantReviews = () => {
		setOpenRestaurantReviews(false);
	};

	return (
		<div>
			<ReviewForm
				isOpen={open}
				userId={connectedUserId}
				targetReview={{
					name: 'productId',
					value: selectedProduct ? selectedProduct.id : '',
				}}
				handleClose={handleClose}
			/>
			<ReviewForm
				isOpen={openRestaurantReviewForm}
				userId={connectedUserId}
				targetReview={{
					name: 'restaurantId',
					value: restaurant.id,
				}}
				handleClose={handleCloseRestaurantReviewForm}
			/>
			<ReviewsList
				reviews={selectedProduct?.productReviews || []}
				isOpen={openProductReviews}
				handleCloseReviews={handleCloseProductReviews}
			/>
			<ReviewsList
				reviews={restaurant?.restaurantReviews || []}
				isOpen={openRestaurantReviews}
				handleCloseReviews={handleCloseRestaurantReviews}
			/>

			<div className='md:p-8 sm:p-4 grid grid-cols-6 gap-4'>
				<div className='col-span-6 '>
					<BackNavigation href='/restaurants' text='Back to Restaurants' />
					<RestaurantDetailsHeader
						restaurant={restaurant}
						handleClickOpenRestaurantReviews={handleClickOpenRestaurantReviews}
						handleClickOpenRestaurantReviewForm={
							handleClickOpenRestaurantReviewForm
						}
					/>
				</div>
				<div className='col-span-6 grid md:grid-cols-4 sm:grid-cols-2 gap-4'>
					{restaurant.products.map((product: ProductWithRating) => (
						<ProductCard
							key={product.id}
							product={product}
							handleClickOpen={handleClickOpen}
							setSelectedProduct={setSelectedProduct}
							handleClickOpenProductReviews={handleClickOpenProductReviews}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
