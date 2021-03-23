# nodejs-finance - API for managing your personal portfolio

### Idea
Create an API to track your assets, asset price changes and transaction history. Additional features can be implemented, as automatic Dollar-cost averaging (DCA) once every certain period, integrations with 3rd party APIs, and more.

### Description of current features
- API key public access
- User creation
- Login (provision of JWT)
- Access to portfolio
- Access to assets and adding new assets
- Access to transaction history
- Tests (partially)
- [Full API documentation](https://documenter.getpostman.com/view/14918328/TzCFhqn4)

### Technologies used
- TypeScript
- MondoDB, mongoose
- TS prettier
- Docker (compose)
- Auth: passport, JWT
- nodemon
- Saving logs locally

### Work in progress (WIP)
- Tests! Improve test coverage

### Improvements
- Convert Decimal128 to number
- Dependency Injection?
- Try out different architectural solutions
- Instead of simple transaction implement deposit, exchange and withdrawal

### Grand plans for the future
- Implement connection with 3rd party API to get asset prices
- Implement DCA strategies
- Automate DCA completely (if possible)