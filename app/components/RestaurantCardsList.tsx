import type { Restaurant } from '@prisma/client';
import RestaurantCard from './RestaurantCard';

interface RestaurantCardsListProps {
	restaurants: Restaurant[];
}

function RestaurantCardsList({ restaurants }: RestaurantCardsListProps) {
	return restaurants.map((restaurant) => (
		<div
			key={restaurant.id}
			data-testid='restaurantCard'
			className='col-span-1'
		>
			<RestaurantCard restaurant={restaurant} />
		</div>
	));
}

export default RestaurantCardsList;
