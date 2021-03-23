/// Initializes MongoDB with some init data
/// (Runs in mongo cli)

function seed(dbName, user, password) {
  db = db.getSiblingDB(dbName);

  db.createUser({
    user: user,
    pwd: password,
    roles: [{ role: 'readWrite', db: dbName }],
  });

  db.createCollection('api_keys');

  db.api_keys.insert({
    metadata: 'To be used by the client',
    key: 'ARBITRARY_API_KEY',
    version: 1,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

seed('nodejs-finance', 'nodejs-finance-user', 'password');
