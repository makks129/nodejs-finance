# nodejs-finance - API for managing your personal portfolio

### Idea
Create an API to track your assets, asset price changes and transaction history. Additional features can be implemented, as automatic dollar-cost averaging (DCA) once every certain period, integrations with 3rd party APIs, and more.

__Note:__

- __This is a simple demo project, which is still work in progress and has a lot to improve.__
- __For demo purposes private keys are commited to git.__

---

### How to run (Docker)
1. Clone repo
2. [Install Docker](https://docs.docker.com/get-docker/)
3. run `docker-compose up`
4. See API docs [here](https://documenter.getpostman.com/view/14918328/TzCFhqn4)

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

---

### Currently working on
- Tests! Improving test coverage
- Try out different architectural solutions

### Improvements
- Make more SOLID: e.g. DI
- Instead of simple transaction implement deposit, exchange and withdrawal
- Convert Decimal128 to number

### Grand plans for the future
- Implement connection with 3rd party API to get asset prices
- Implement DCA strategies
- Automate DCA completely (if possible)
