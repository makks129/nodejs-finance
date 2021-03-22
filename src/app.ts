import express, { Request, Response, NextFunction } from 'express';
import './db'; // init DB
import cors from 'cors';
import morgan from 'morgan';
import { corsUrl} from './config';
import routesV0 from './routes/v0';
import passport from 'passport';
// import Logger from './core/Logger';
// import { NotFoundError, ApiError, InternalError } from './core/ApiError';

process.on('uncaughtException', (e) => {
  // Logger.error(e);
  console.log(e);
});

const app = express();

// Init express
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));

// Init morgan
app.use(morgan('dev'));

// Init passport
app.use(passport.initialize());

// Init CORS
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

// Routes
app.use('/v0', routesV0);

// Catch 404 and forward to error handler
// app.use((req, res, next) => next(new NotFoundError()));
app.use((req, res, next) => next('404 Error'));

// TODO
// Middleware Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   if (err instanceof ApiError) {
//     ApiError.handle(err, res);
//   } else {
//     if (environment === 'development') {
//       // Logger.error(err);
//       console.log(err);
//       return res.status(500).send(err.message);
//     }
//     ApiError.handle(new InternalError(), res);
//   }
// });

export default app;
