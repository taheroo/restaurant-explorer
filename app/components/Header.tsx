import { Form, useSubmit } from '@remix-run/react';
import UserAvatarWithInfo from './UserAvatarWithInfo';

interface HeaderProps {
	query: {
		name: string;
		cuisine: string;
		myRestaurants: string;
		userId: string;
	};
	connectedUser: {
		id: string;
		email: string;
		name: string;
	};
}

function Header({ query, connectedUser }: HeaderProps) {
	const submit = useSubmit();
	return (
		<div className='mx-auto px-4 py-8 sm:px-6 lg:px-8'>
			<div className='flex items-center sm:justify-between sm:gap-4'>
				<Form method='get' className='flex items-center'>
					<div className='relative'>
						<label className='sr-only' htmlFor='search'>
							{' '}
							Search{' '}
						</label>

						<input
							data-testid='searchInput'
							className='h-10 w-full rounded-lg border-none bg-white pe-10 ps-4 text-sm shadow-sm sm:w-56'
							id='search'
							type='search'
							name='name'
							placeholder='Search website...'
						/>

						<button
							data-testid='searchBtn'
							type='submit'
							className='absolute end-1 top-1/2 -translate-y-1/2 rounded-md bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700'
						>
							<span className='sr-only'>Search</span>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-4 w-4'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								strokeWidth='2'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
								/>
							</svg>
						</button>
					</div>

					<div className='ml-8'>
						<label
							htmlFor='cuisine'
							className='block text-sm font-medium text-gray-900'
						>
							Cuisine
						</label>

						<select
							data-testid='selectCuisine'
							name='cuisine'
							id='cuisine'
							className='mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm'
							defaultValue={query.cuisine}
							onChange={(e) => submit(e.currentTarget.form)}
						>
							<option value=''>All</option>
							<option value='German'>German</option>
							<option value='French'>French</option>
						</select>
					</div>
					<div className='ml-8'>
						<label
							htmlFor='toggle'
							className='block text-sm font-medium text-gray-900'
						>
							My restaurants
						</label>
						<div className='relative inline-block w-10 mr-2 align-middle select-none'>
							<input
								data-testid='myReviewedRestaurants'
								type='checkbox'
								id='myRestaurants'
								name='myRestaurants'
								className='toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer'
								checked={query.myRestaurants === 'on'}
								onChange={(e) => submit(e.currentTarget.form)}
							/>
							<label
								htmlFor='toggle'
								className={`toggle-label block overflow-hidden h-6 rounded-full ${
									query.myRestaurants ? 'bg-green-400' : 'bg-gray-300'
								} cursor-pointer`}
							/>
						</div>
					</div>
				</Form>
				<div className='flex flex-1 items-center justify-between gap-8 sm:justify-end sm:invisible md:visible invisible'>
					<UserAvatarWithInfo user={connectedUser} />
				</div>
			</div>

			<div className='mt-8'>
				<h1 className='text-2xl font-bold text-gray-900 sm:text-3xl'>
					Discover and Explore Restaurant Reviews!
				</h1>

				<p className='mt-1.5 text-sm text-gray-500'>
					Find the Best Dining Experiences! 🚀
				</p>
			</div>
		</div>
	);
}

export default Header;
