import express, { Request, Response, NextFunction } from 'express';
import './db'; // init DB
import cors from 'cors';
import morgan from 'morgan';
import { corsUrl, environment } from './config';
import routesV0 from './routes/v0';
import passport from 'passport';
import Log from './utils/Log';
import { ApiError, InternalError, NotFoundError } from './core/api-errors';

process.on('uncaughtException', (e) => {
  Log.error(e);
});

const app = express();

// Init express
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));

// Init morgan (logger)
app.use(morgan('dev'));

// Init passport (authentication)
app.use(passport.initialize());

// Init CORS
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

// Set routes
app.use('/v0', routesV0);

// Catch 404 and forward to error handler
// app.use((req, res, next) => next(new NotFoundError()));
app.use((req, res, next) => next(new NotFoundError()));

// Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
  } else {
    if (environment === 'development') {
      Log.error(err);
      return res.status(500).send(err.message);
    }
    ApiError.handle(new InternalError(), res);
  }
});

export default app;
