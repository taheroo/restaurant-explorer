import { useState } from 'react';
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useNavigate, Outlet } from '@remix-run/react';
import type { Product } from '@prisma/client';
import { getRestaurantById } from '~/models/restaurant.server';
import { getUserByEmail } from '~/models/user.server';
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

export default function RestaurantDetailsRoute() {
	const { restaurant, user } = useLoaderData();
	const connectedUserId = user.id;

	const navigate = useNavigate();

	const [open, setOpenReviewForm] = useState(false);
	const [openProductReviews, setOpenProductReviews] = useState(false);
	const [openRestaurantReviews, setOpenRestaurantReviews] = useState(false);
	const [selectedProduct, setSelectedProduct] =
		useState<ProductWithRating | null>(null);

	const handleClickOpen = (
		productId: string,
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		navigate(`/restaurants/${restaurant.id}/products/${productId}`);
		event.preventDefault();
		event.stopPropagation();
		setOpenReviewForm(true);
	};
	const handleClickOpenRestaurantReviewForm = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		navigate(`/restaurants/${restaurant.id}/review`);
		event.preventDefault();
		event.stopPropagation();
		setOpenReviewForm(true);
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
			<Outlet context={{ open, setOpenReviewForm, userId: connectedUserId }} />
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
							handleClickOpen={(event) => handleClickOpen(product.id, event)}
							setSelectedProduct={setSelectedProduct}
							handleClickOpenProductReviews={handleClickOpenProductReviews}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
