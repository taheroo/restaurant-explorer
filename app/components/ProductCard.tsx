import type { Product } from '@prisma/client';

interface ProductWithRating extends Product {
	averageRating: number;
}

interface ProductCardProps {
	product: ProductWithRating;
	handleClickOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
	setSelectedProduct: React.Dispatch<
		React.SetStateAction<ProductWithRating | null>
	>;
	handleClickOpenProductReviews: (
		event: React.MouseEvent<HTMLButtonElement>
	) => void;
}

function ProductCard({
	product,
	handleClickOpen,
	setSelectedProduct,
	handleClickOpenProductReviews,
}: ProductCardProps) {
	return (
		<div
			data-testid='productCard'
			key={product.id}
			className='group relative block overflow-hidden'
		>
			<button
				data-testid='createProductReviewBtn'
				onClick={(event) => {
					handleClickOpen(event);
					setSelectedProduct(product);
				}}
				className='absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75'
			>
				<span className='sr-only'>Review</span>

				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='h-4 w-4'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
					/>
				</svg>
			</button>

			<img
				src={product.imageUrl}
				alt={product.name}
				className='h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72'
			/>

			<div className='relative border border-gray-100 bg-white p-6'>
				<span className='whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium'>
					New
				</span>

				<h3 className='mt-4 text-lg font-medium text-gray-900'>
					{product.name} | {product.averageRating}
				</h3>

				<p className='mt-1.5 text-sm text-gray-700'>${product.price}</p>

				<div className='mt-4'>
					<button
						data-testid='displayProductReviewsBtn'
						onClick={(event) => {
							handleClickOpenProductReviews(event);
							setSelectedProduct(product);
						}}
						className='block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105'
					>
						Display Reviews
					</button>
				</div>
			</div>
		</div>
	);
}

export default ProductCard;
