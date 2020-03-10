# Task Result

## Used technologies / Frameworks
I use the following technologies / frameworks in my project:

- NodeJS
- Puppeteer
- ExpressJS
- MongoDB
- Mongoose


### Style Guidelines
Module Name | Reason
--- | ---
[eslint](https://www.npmjs.com/package/eslint) | .js files linting
[eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) | ESLint preset
[eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import) | Used with eslint-config-airbnb-base
[eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier) | ESLint: Prettier integration
[eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier) | ESLint: run Prettier on --fix
[prettier](https://www.npmjs.com/package/prettier) | Prettier (core)
[lint-staged](https://www.npmjs.com/package/lint-staged) | Staged files linting
[husky](https://www.npmjs.com/package/husky) | Used with lint-staged

## Used 3rd Party Libraries
I use the following 3rd party libraries in my project:

Name | Reason
--- | ---
[NodeJS](https://nodejs.org/) | Required by the task
[Puppeteer](https://www.npmjs.com/package/puppeteer) | Required by the task
[ExpressJS](https://www.npmjs.com/package/express) | Web framework for NodeJS
[MongoDB](https://www.mongodb.com/) | NoSQL Database
[Mongoose](https://www.npmjs.com/package/mongoose) | MongoDB ODM


## Installation / Run
The following components must be installed locally:

- [nodejs](https://nodejs.org/en/) v10.16.0

To run the project locally, enter the following in the command line / bash:

```console
$ git clone https://github.com/Artem12345678/remazing-backend-crawler.git
$ cd remazing-backend-crawler
$ cp .env.example .env (and fill necessary data)
$ npm install
$ npm run crawler (to populate MongoDB collection)
$ npm run start (to run ExpressJS server and get stored data)
```
---