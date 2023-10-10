# Ecommerce BackEnd Node.js

Welcome to the README.md for the Ecommerce BackEnd Node.js project! This project is a robust and scalable backend API built with Node.js, Express.js, and MongoDB for managing an Ecommerce platform. It incorporates various essential features and design patterns to ensure security, scalability, and maintainability.

## Table of Contents

- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [Features](#features)
- [Design Patterns](#design-patterns)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Contributing](#contributing)
- [License](#license)

## Dependencies

The project relies on the following npm packages as its core dependencies:

- [bcrypt](https://www.npmjs.com/package/bcrypt) - For password hashing and salting.
- [crypto](https://www.npmjs.com/package/crypto) - For cryptographic functionality.
- [dotenv](https://www.npmjs.com/package/dotenv) - To load environment variables.
- [express](https://www.npmjs.com/package/express) - A fast and minimalist web framework.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - For generating and verifying JSON Web Tokens (JWT).
- [lodash](https://www.npmjs.com/package/lodash) - Utility functions for JavaScript.
- [mongoose](https://www.npmjs.com/package/mongoose) - A MongoDB object modeling tool.
- [slugify](https://www.npmjs.com/package/slugify) - For generating slugs from strings.

## Dev Dependencies

These are development dependencies used for enhancing the development experience:

- [compression](https://www.npmjs.com/package/compression) - Middleware for response compression.
- [helmet](https://www.npmjs.com/package/helmet) - Middleware to secure Express apps.
- [morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware.

## Features

The Ecommerce BackEnd Node.js project includes the following key features:

- **API Key Management**: The API provides functionality for managing API keys securely.

- **Authentication**: Users can register, log in, and authenticate with the API using JWT (JSON Web Tokens).

- **Authorization**: Role-based authorization ensures that only authorized users can access specific endpoints and perform actions.

- **Product Management**: Create, read, update, and delete products in the Ecommerce platform.

- **User Management**: Admins can manage users, including creating and updating user roles.

- **Order Processing**: Process and manage customer orders, including order creation and status updates.

- **Payment Integration**: Integration with payment gateways for accepting payments.

- **Product Categories**: Organize products into categories and subcategories.

- **Search and Filtering**: Implement search and filtering functionality for products.

## Design Patterns

This project incorporates two essential design patterns:

- **Factory Design Pattern**

In this project, we have implemented the Factory design pattern in the `ProductFactory` class. The Factory pattern is used to create instances of different product types dynamically based on the provided `type`. This promotes flexibility and allows for easy extension of the application with new product types without modifying the existing codebase.

- **Registering Product Types**

In the `RegisterProductType` method of the `ProductFactory` class, we iterate over the `configProductType` object, which contains mappings between product types and their corresponding class references. We register these product types and their associated class references in the `productRegistry` object. This registration step is crucial because it associates each product type with its respective class.

## Getting Started

Follow these steps to get started with the project:

1. Clone the repository: `git clone https://github.com/kigaijidev/ecommerce-backend-nodejs`
2. Install dependencies: `npm install`
3. Create a `.env` file with necessary environment variables (follow `.env.example`).

## Usage

To run the project, use the following command:

```bash
npm start
```

The API will be accessible at `http://localhost:PORT`, where `PORT` is the specified port in your `.env` file.

## API Routes
API need `x-api-key` in Headers and `x-client-id`, `authorization` when using API have Authentication.
Here is a brief overview of the API routes and their functionalities:

- **Authentication**:
  - `/v1/api/auth/signup`: Register a new user.
  - `/v1/api/auth/login`: Authenticate and generate a JWT token.
  - `/v1/api/auth/handler-refresh`: Get new access token from refresh token.
  - `/v1/api/auth/logout`: Logout user.

- **Product Management**:
  - `/v1/api/product`: Get all products.
  - `/v1/api/product/:id`: Get a specific product by ID.
  - `/v1/api/product/search/:keySearch`: Search products by key search.
  - `/v1/api/product/create`: Create a new product (shop or admin only).
  - `/v1/api/product/publish/:id`: Publish product on Shop (shop or admin only).
  - `/v1/api/product/unpublish/:id`: UnPublish product on Shop (shop or admin only).
  - `/v1/api/product/drafts/all`: Get all products is draft (shop or admin only).
  - `/v1/api/product/publish/all`: Get all products is publish (shop or admin only).

- **Search and Filtering**:
  - Implement search and filtering as needed based on project requirements.

## Contributing

We welcome contributions from the community. Feel free to submit issues or pull requests to help improve this project.

## License

This project is licensed under the [MIT License](LICENSE.md).

Thank you for using the Ecommerce BackEnd Node.js project! If you have any questions or need further assistance, please don't hesitate to reach out.
