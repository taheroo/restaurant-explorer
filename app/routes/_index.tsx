import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getRestaurants } from '~/models/restaurant.server';
import { getUserByEmail } from '~/models/user.server';
import RestaurantCardsList from '~/components/RestaurantCardsList';
import Header from '~/components/Header';

export const loader = async ({ request }: LoaderArgs) => {
	const connectedUser = await getUserByEmail('alice@gmail.com');
	if (!connectedUser) throw new Error('User not found');
	const url = new URL(request.url);
	const searchParams = new URLSearchParams(url.search);
	const query = {
		name: searchParams.get('name') || '',
		cuisine: searchParams.get('cuisine') || '',
		myRestaurants: searchParams.get('myRestaurants') || '',
		userId: connectedUser.id,
	};
	const restaurants = await getRestaurants(query);
	return json({ restaurants, connectedUser, query });
};

export default function RestaurantsRoute() {
	const { restaurants, connectedUser, query } = useLoaderData<typeof loader>();

	return (
		<div className='grid grid-cols-4'>
			<div className='col-span-4'>
				<Header query={query} connectedUser={connectedUser} />
			</div>
			<div className='md:p-8 sm:p-4 col-span-4 grid md:grid-cols-4 sm:grid-cols-2 gap-4'>
				<RestaurantCardsList restaurants={restaurants} />
			</div>
		</div>
	);
}
