import getRestaurants from '../../prisma/seeds/restaurants.seed';

describe('Test display Restaurants', () => {
	let restaurants = getRestaurants();
	let restaurantsCount = restaurants.length;

	beforeEach(() => {
		cy.visit('localhost:3000');
		cy.wait(1000);
	});

	it('should display restaurants', () => {
		cy.get('[data-testid="restaurantCard"]').should(
			'have.length',
			restaurantsCount
		);
	});

	it('should filter restaurants by name', () => {
		const filterRestaurantsByName = (name: string) => {
			return restaurants.filter((restaurant) => {
				return restaurant.name.toLowerCase().includes(name.toLowerCase());
			});
		};
		const filteredRestaurants = filterRestaurantsByName('Zur');
		cy.get('[data-testid="searchInput"]').type('Zur');
		cy.get('[data-testid="searchBtn"]').click({ force: true });
		cy.get('[data-testid="restaurantCard"]').should(
			'have.length',
			filteredRestaurants.length
		);
	});

	it('should filter restaurants by cuisine', () => {
		const filterRestaurantsByCuisine = (cuisine: string) => {
			return restaurants.filter((restaurant) => {
				return restaurant.cuisine.toLowerCase().includes(cuisine.toLowerCase());
			});
		};
		const filteredRestaurants = filterRestaurantsByCuisine('German');
		cy.get('[data-testid="selectCuisine"]').select(1);
		cy.get('[data-testid="restaurantCard"]').should(
			'have.length',
			filteredRestaurants.length
		);
	});
});

describe('Test display Products and display/create Reviews', () => {
	beforeEach(() => {
		cy.visit('localhost:3000');
		cy.wait(1000);
		cy.get('[data-testid="restaurantCard"]').first().click();
		cy.wait(1000);
	});

	it('should create a product review', () => {
		cy.intercept(`/restaurants/*/products/*`).as('getProductReview');
		cy.get('[data-testid="createProductReviewBtn"]').first().click();
		cy.wait('@getProductReview').then(({ response }) => {
			if (response && response.body && response.body.productReview) {
				cy.get('[data-testid="error-productId"]').should('be.visible');
				return;
			}
			cy.get('[data-testid="title-productId"]').type('Delicious');
			cy.get('[data-testid="comment-productId"]').type(
				'I love this food, it is great!'
			);
			cy.get('[data-testid="rating-productId"]').select('5');
			cy.get('[data-testid="submitBtn-productId"]').click();
		});
	});

	it('should display product reviews', () => {
		cy.get('[data-testid="productCard"]').should('have.length.greaterThan', 0);
		cy.get('[data-testid="displayProductReviewsBtn"]').first().click();
	});

	it('should create a restaurant review', () => {
		cy.get('[data-testid="createRestaurantReviewBtn"]').first().click();
		cy.get('[data-testid="title-restaurantId"]').type('Amazing');
		cy.get('[data-testid="comment-restaurantId"]').type(
			'I love this restaurant, it is great!'
		);
		cy.get('[data-testid="rating-restaurantId"]').select('5');
		cy.get('[data-testid="submitBtn-restaurantId"]').click();
	});

	it('should display restaurant reviews', () => {
		cy.get('[data-testid="displayRestaurantReviewsBtn"]').click();
	});

	it('should display restaurants reviewed by the connected user', () => {
		cy.get('[data-testid="backToRestaurantsLink"]').click();
		cy.wait(1000);
		cy.get('[data-testid="myReviewedRestaurants"]').click({ force: true });
		cy.get('[data-testid="restaurantCard"]').should(
			'have.length.greaterThan',
			0
		);
	});
});
