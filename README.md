# Project Description: Building a Node.js **REST-API** for Product Management

  

## Overview:

Create a robust Node.js **REST-API** for product management, providing full CRUD (Create, Read, Update, Delete) functionality for products. The API will be built using your choice of Node.js framework and MongoDB as the database. The product schema must include essential fields such as name, category, price, and availability. Additionally, the project must integrate features like pagination, search, purchase tracking, and external API integration.

  

## Key Features:

  

1. **Product CRUD Operations**: Implement Create, Read, Update, and Delete operations for products, ensuring that the product schema includes essential fields like name, category, price, and availability.

  

2. **Pagination and Search:** Integrate pagination for the Read operations, allowing users to specify the page number and items per page. Implement a search feature to filter products based on various criteria such as name, category, or price.

  

3. **Purchase Endpoint:** Create an endpoint to purchase a product, tracking the purchase details (e.g., product purchased, date, and user).

  

4. **Aggregation for Purchase Stats:** Implement a MongoDB aggregation endpoint, `/purchase/stats`, to provide statistics on product purchases. Users should be able to retrieve purchase data, such as total purchases, top-selling products, or purchase trends.

  

5. **External API Integration:** Integrate an external API, specifically the [Random Data API](https://random-data-api.com/api/v2/credit_cards?size=100), to fetch credit card data. Filter the data to exclude credit card numbers and limit the type of credit cards to Visa. Consider customizing the size of the returned data.

  

6. **Database Model:** Exercise creativity in designing the database model. You have the freedom to structure the database schema to suit the project's needs efficiently.

  

7. **Containerization with Docker [Optional]:** Containerize both the application and MongoDB using Docker. Create a Docker Compose configuration to ensure smooth deployment and management of the services.

  

8. **Authentication and Authorization (Extra Points)[Optional]:** Implement JWT-based authentication and authorization to secure specific routes. Some routes, like purchasing or managing products, should be accessible only to authenticated and authorized users.

  

9. **Linting:** Use a linter (e.g., ESLint) to enforce code quality and consistency throughout the project.

  

**Documentation and GitHub:**

  

- Provide thorough documentation in a README file, detailing how to set up, run, test ...ect

- Explain the database schema and model design choices.

- Describe how to use the API endpoints and provide example requests and responses.

- Include information on integrating and running the Docker containers.

- If you choose to implement authentication, document the authentication process.

- Push your code to a public GitHub repository for version control and collaboration.

  

**CI/CD Consideration [Optional]:**

  

While it's encouraged to use GitHub Actions for continuous integration and deployment (CI/CD).


*And suit yourself to add any features or utilize any tools you believe add value, solve specific problem, boost performance or even enhance development experience*

***

> ***Just have fun and be creative***  :sunglasses:

***


**Dependencies:**


You might user docker-compose or run locally with node and npm. Tested node version is: ***>=18***. 

***Create your .env file***:
Create a new file called `.env` and pass the data from the variables from `.env.examples`. *PS: Current secret variables are for testing purposes only; no need to worry!*.

***To run locally with node***:

```
# install all dependencies
npm install
# start server
npm start

```

***To run with docker-compose***:
```
# to build your docker image
docker-compose build
# to run your built docker image
docker-compose up
# or simply run
docker-compose up -d
```

***To check your .js files with eslint***:

`npm run lint:fix`


***Remaining features:***

- [ ] Add more stats,
- [ ] Use an external data api,
- [ ] Deploy on a web server,
- [ ] Add CI/CD,
