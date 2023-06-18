import { useState } from 'react';
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, Outlet } from '@remix-run/react';
import type { Product } from '@prisma/client';
import { getRestaurantById } from '~/models/restaurant.server';
import { getUserByEmail } from '~/models/user.server';
import ReviewsList from '~/components/ReviewsList';
import ProductCard from '~/components/ProductCard';
import RestaurantDetailsHeader from '~/components/RestaurantDetailsHeader';
import BackNavigation from '~/components/BackNavigation';
import { useModalHandlers } from '~/hooks/useModalHandlers';

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
	const {
		openReviewForm,
		openProductReviews,
		openRestaurantReviews,
		handleClickOpenProductReviewForm,
		handleClickOpenRestaurantReviewForm,
		handleClickOpenProductReviews,
		handleCloseProductReviews,
		handleClickOpenRestaurantReviews,
		handleCloseRestaurantReviews,
		closeReviewFormModal,
	} = useModalHandlers();
	const [selectedProduct, setSelectedProduct] =
		useState<ProductWithRating | null>(null);

	return (
		<div>
			<Outlet
				context={{
					open: openReviewForm,
					closeReviewFormModal,
					userId: connectedUserId,
				}}
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
						handleClickOpenRestaurantReviewForm={(event) =>
							handleClickOpenRestaurantReviewForm(event, restaurant.id)
						}
					/>
				</div>
				<div className='col-span-6 grid md:grid-cols-4 sm:grid-cols-2 gap-4'>
					{restaurant.products.map((product: ProductWithRating) => (
						<ProductCard
							key={product.id}
							product={product}
							handleClickOpen={(event) =>
								handleClickOpenProductReviewForm(
									event,
									product.id,
									restaurant.id
								)
							}
							setSelectedProduct={setSelectedProduct}
							handleClickOpenProductReviews={handleClickOpenProductReviews}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
