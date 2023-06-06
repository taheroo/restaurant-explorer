import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { db } from '~/utils/db.server';
import { getRestaurants } from '~/models/restaurant.server';
import RestaurantCard from '~/components/RestaurantCard';
import Header from '~/components/Header';

export const loader = async ({ request }: LoaderArgs) => {
	const user = await db.user.findUnique({
		where: { email: 'alice@gmail.com' },
	});
	if (!user) throw new Error('User not found');
	const url = new URL(request.url);
	const search = new URLSearchParams(url.search);
	const query = {
		name: search.get('name') || '',
		cuisine: search.get('cuisine') || '',
		myRestaurants: search.get('myRestaurants') || '',
		userId: user.id,
	};
	let restaurants = await getRestaurants(query);
	return json({
		restaurants,
		user,
		query,
	});
};

export default function RestaurantsRoute() {
	const { restaurants, user, query } = useLoaderData<typeof loader>();
	const connectedUser = user;

	return (
		<div className='grid grid-cols-4'>
			<div className='col-span-4'>
				<Header query={query} connectedUser={connectedUser} />
			</div>
			<div className='md:p-8 sm:p-4 col-span-4 grid md:grid-cols-4 sm:grid-cols-2 gap-4'>
				{restaurants.map((restaurant) => (
					<div
						key={restaurant.id}
						data-testid='restaurantCard'
						className='col-span-1'
					>
						<RestaurantCard restaurant={restaurant} />
					</div>
				))}
			</div>
		</div>
	);
}
