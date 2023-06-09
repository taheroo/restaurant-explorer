# Restaurant Explorer

This project is a crowdsourced food rating system built to help users find and review restaurants and their products.  
It allows users to view restaurant information, rate and review restaurants and products, and filter restaurants based on cuisine.  
Additionally, users can view a list of restaurants they have previously rated.

## Preview

To see the live version of the application, visit the [Restaurant Explorer site](https://restaurant-explorer-povpg4o6v-taheroo.vercel.app/).
![usage example](https://github.com/taheroo/restaurant-explorer/blob/master/public/landing-page.jpg)

## UML class diagram

The UML class diagram provides an overview of the system's architecture and relationships between different components.

![usage example](https://github.com/taheroo/restaurant-explorer/blob/master/public/uml-class-diagram.png)

## Development

To set up the development environment for this project, follow the steps below:

1. Setup Postgres instance locally using Docker:

```sh
docker compose up --detach dev-db
```

2. Setup the database by creating a .env file in the root directory and adding the following configuration:

```sh
DATABASE_URL=postgres://postgres:postgres@localhost:5432/restaurant-explorer
```

3. Install the required dependencies:

```sh
npm install
```

4. Setup the database:

```sh
npm run setup
```

5. Start the development server, which automatically rebuilds assets on file changes:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Testing

To run the test suite for the project, execute the following command:

```sh
npm run test:e2e:dev
```

This runs the test suite inside the `cypress/e2e` folder.

## Project structure

A very simple project structure:

- `app`: This folder is the main container of all the code inside your application.
  - `components`: Folder to store any common component that you use through your app (such as a generic button).
  - `hooks`: This folder contains all customized hooks that is helpful on any given context.
  - `model`: Contains business logic and data models.
  - `routes`: Folder to store all the routes in your application.
  - `utils`: Helpful utilities.

## Features

- As a user, I can see the restaurants and their available products,  
  each with the latest review and the average rating, if they exist.
- As a user, I can rate and leave reviews for each restaurant and product.
- As a user, I can filter restaurants based on cuisine.
- As a user, I can see all the restaurants I have rated in the past.

## Contribution

Contributions to this project are welcome. If you find any issues or have suggestions for improvement, please feel free to create a pull request or submit an issue on the project's repository.
