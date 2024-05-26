import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandlers from './app/middlewares/globalErrorHandlers';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

app.use(globalErrorHandlers);

// Not found middleware
app.use(notFound);
export default app;
