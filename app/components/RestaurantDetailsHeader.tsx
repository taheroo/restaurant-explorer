import type { Restaurant } from '@prisma/client';

interface RestaurantDetailsHeaderProps {
	restaurant: Restaurant;
	handleClickOpenRestaurantReviews: (
		event: React.MouseEvent<HTMLButtonElement>
	) => void;
	handleClickOpenRestaurantReviewForm: (
		event: React.MouseEvent<HTMLButtonElement>
	) => void;
}

function RestaurantDetailsHeader({
	restaurant,
	handleClickOpenRestaurantReviews,
	handleClickOpenRestaurantReviewForm,
}: RestaurantDetailsHeaderProps) {
	return (
		<div className='sm:flex sm:items-center sm:justify-between'>
			<div className='text-center sm:text-left'>
				<h1 className='text-2xl font-bold text-gray-900 sm:text-3xl'>
					{restaurant.name}
				</h1>

				<p className='mt-1.5 text-sm text-gray-500'>{restaurant.description}</p>
			</div>

			<div className='mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center'>
				<button
					data-testid='displayRestaurantReviewsBtn'
					className='inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-500 transition hover:text-gray-700 focus:outline-none focus:ring'
					type='button'
					onClick={handleClickOpenRestaurantReviews}
				>
					<span className='text-sm font-medium'> View Reviews </span>

					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-4 w-4'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						strokeWidth={2}
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
						/>
					</svg>
				</button>

				<button
					data-testid='createRestaurantReviewBtn'
					className='block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring'
					onClick={handleClickOpenRestaurantReviewForm}
				>
					Create Review
				</button>
			</div>
		</div>
	);
}

export default RestaurantDetailsHeader;
