import express from 'express';

import {
  errorHandler,
  routeNotFoundHandler,
} from './common/error/errorHandler';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health',   (req, res) => res.send({ message: 'OK' }));

app.use([errorHandler, routeNotFoundHandler]);

export { app };
