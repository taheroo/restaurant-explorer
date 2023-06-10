import type { User } from '@prisma/client';
import StarRating from './StarRating';
import EmptyReviewsList from './EmptyReviewsList';
import useOutsideClick from '~/hooks/useOutsideClick';

interface Review {
	id: string;
	title: string;
	comment: string;
	rating: number;
	user: User;
}

interface ReviewsListProps {
	reviews: Review[];
	isOpen: boolean;
	ref: any;
	handleCloseReviews: () => void;
}

function ReviewsList({
	reviews,
	isOpen,
	ref,
	handleCloseReviews,
}: ReviewsListProps) {
	useOutsideClick(ref, handleCloseReviews, isOpen);

	return (
		<div
			style={{ display: isOpen ? 'block' : 'none', zIndex: 9999 }}
			className='fixed hidden inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'
		>
			<div
				ref={ref}
				id='popup-content'
				className='relative top-20 mx-auto p-5 border w-full shadow-lg rounded-md bg-white'
			>
				{reviews.length > 0 ? (
					<section className='bg-white'>
						<div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
							<h2 className='text-center text-4xl font-bold tracking-tight sm:text-5xl'>
								Read trusted reviews from our customers
							</h2>

							<div className='mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8'>
								{reviews.map((review) => (
									<blockquote
										key={review.id}
										className='rounded-lg bg-gray-100 p-8'
									>
										<div className='flex items-center gap-4'>
											<img
												alt='Man'
												src='https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80'
												className='h-16 w-16 rounded-full object-cover'
											/>

											<div>
												<div className='flex justify-center gap-0.5 text-green-500'>
													<StarRating count={review.rating} />
												</div>

												<p className='mt-1 text-lg font-medium text-gray-700'>
													{review.user.name} | {review.title}
												</p>
											</div>
										</div>

										<p className='line-clamp-2 sm:line-clamp-none mt-4 text-gray-500'>
											{review.comment}
										</p>
									</blockquote>
								))}
							</div>
						</div>
					</section>
				) : (
					<EmptyReviewsList />
				)}
			</div>
		</div>
	);
}

export default ReviewsList;
