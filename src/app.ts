
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { errorHandler, notFound } from './utils';

const app = express();

// import { db } from './database';

import ApiRouter from './api';

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1', ApiRouter);

app.get('/checkhealth', (_, res) => {
    res.status(200).json({
        message: 'Negative',
    });
});


app.use(notFound);
app.use(errorHandler);

export default app;
