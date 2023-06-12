import { Form } from '@remix-run/react';
import { useRef } from 'react';
import useOutsideClick from '~/hooks/useOutsideClick';

interface ReviewFormProps {
	isOpen: boolean;
	userId: string;
	targetReview: {
		name: string;
		value: string;
	};
	handleClose: () => void;
	errorMessage?: string;
}

function ReviewForm({
	isOpen,
	userId,
	targetReview,
	handleClose,
	errorMessage,
}: ReviewFormProps) {
	const popupRef = useRef(null);
	useOutsideClick(popupRef, handleClose, isOpen);
	return (
		<div
			style={{ display: isOpen ? 'block' : 'none', zIndex: 9999 }}
			className='fixed hidden inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'
		>
			<div
				ref={popupRef}
				id='popup-content'
				className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'
			>
				{errorMessage ? (
					<div
						className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
						role='alert'
						data-testid={'error-' + targetReview.name}
					>
						<strong className='font-bold'>Error!</strong>
						<br />
						<span className='block sm:inline'>{errorMessage}</span>
					</div>
				) : (
					<Form method='post'>
						<div>
							<label
								htmlFor='title'
								className='block text-xs font-medium text-gray-700'
							>
								Title
							</label>

							<input
								data-testid={'title-' + targetReview.name}
								type='text'
								name='title'
								placeholder='title'
								className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm px-4 py-2'
							/>
						</div>
						<div>
							<input
								name={targetReview.name}
								type='hidden'
								value={targetReview.value}
							/>
						</div>
						<div>
							<input name='userId' type='hidden' value={userId} />
						</div>
						<div>
							<label
								htmlFor='comment'
								className='block text-xs font-medium text-gray-700'
							>
								Comment
							</label>

							<textarea
								data-testid={'comment-' + targetReview.name}
								rows={10}
								name='comment'
								placeholder='comment'
								className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm px-4 py-2'
							/>
						</div>
						<div>
							<label
								htmlFor='rating'
								className='block text-sm font-medium text-gray-900'
							>
								Rating
							</label>

							<select
								data-testid={'rating-' + targetReview.name}
								name='rating'
								id='rating'
								className='mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm'
							>
								<option value=''>Please select</option>
								<option value='1'>1</option>
								<option value='2'>2</option>
								<option value='3'>3</option>
								<option value='4'>4</option>
								<option value='5'>5</option>
							</select>
						</div>
						<div className='flex justify-between px-4 py-3'>
							<button
								data-testid={'submitBtn-' + targetReview.name}
								type='submit'
								onClick={handleClose}
								id='ok-btn'
								className='px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300'
							>
								Submit
							</button>
							<button
								type='button'
								onClick={handleClose}
								id='ok-btn'
								className='px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300'
							>
								Cancel
							</button>
						</div>
					</Form>
				)}
			</div>
		</div>
	);
}

export default ReviewForm;
