import mongoose from 'mongoose';
import { runEnvironment, db } from '../config';
import Log from '../utils/Log';

// Build the connection string
const dbURI =
  runEnvironment === 'localhost'
    ? `mongodb://${db.host}:${db.port}/${db.name}`
    : `mongodb://${db.user}:${encodeURIComponent(db.password)}@${db.host}:${db.port}/${db.name}`;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  autoIndex: true,
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

Log.debug(dbURI);

// Create the database connection
mongoose
  .connect(dbURI, options)
  .then(() => {
    Log.info('Mongoose connection done');
  })
  .catch((e) => {
    Log.info('Mongoose connection error');
    Log.error(e);
  });

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  Log.info('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  Log.error('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  Log.info('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    Log.info('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
