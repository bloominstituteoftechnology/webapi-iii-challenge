import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import mainRouter from './Routes';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());

app.use('/api', mainRouter);

/*eslint-disable */
app.listen(3000, () => console.log('hey'));
