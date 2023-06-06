import { PrismaClient } from "@prisma/client";
import getUsers from "./seeds/users.seed";
import getRestaurants from "./seeds/restaurants.seed";
import getProducts from "./seeds/products.seed";
import getProductReviews from "./seeds/productReviews.seed";
import getRestaurantReviews from "./seeds/restaurantReviews.seed";

const db = new PrismaClient();

async function seed() {
  const users = await Promise.all(
    getUsers().map((user) => {
      return db.user.create({ data: user });
    })
  );

  const restaurants = await Promise.all(
    getRestaurants().map((restaurant) => {
      return db.restaurant.create({ data: restaurant });
    })
  );

  const numberOfRestaurants = restaurants.length;
  const randomRestaurantIndex = () => Math.floor(Math.random() * numberOfRestaurants);
  const idOfRandomRestaurant = () => restaurants[randomRestaurantIndex()].id;

  const products = await Promise.all(
    getProducts().map((product) => {
      return db.product.create({ data: {...product, restaurantId: idOfRandomRestaurant()} });
    })
  );

  const numberOfProducts = products.length;
  const randomProductIndex = () => Math.floor(Math.random() * numberOfProducts);
  const idOfRandomProduct = () => products[randomProductIndex()].id;

  const numberOfUsers = users.length;
  const randomUserIndex = () => Math.floor(Math.random() * numberOfUsers);
  const idOfRandomUser = () => users[randomUserIndex()].id;

  await Promise.all(
    getProductReviews().map((productReview) => {
      return db.productReview.create({ data: 
        {...productReview, userId: idOfRandomUser(), productId: idOfRandomProduct()} });
    }
  ));

  await Promise.all(
    getRestaurantReviews().map((restaurantReview) => {
      return db.restaurantReview.create({ data: 
        {...restaurantReview, userId: idOfRandomUser(), restaurantId: idOfRandomRestaurant()} });
    }
  ));

}

seed();