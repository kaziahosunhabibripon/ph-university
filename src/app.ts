import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandlers from './app/middlewares/globalErrorHandlers';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';
const app: Application = express();

app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'] }));
app.use(cookieParser());

app.use('/api/v1', router);
const health = async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'API is working',
    data: 'Health Check',
  });
};
app.get('/', health);
app.use(globalErrorHandlers);

// Not found middleware
app.use(notFound);
export default app;
