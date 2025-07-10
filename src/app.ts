import express, { Request, Response } from 'express';

const app = express();



// Example route
app.get('/', (req:Request, res:Response) => {
  res.json({ message: 'API is running 🚀' });
});

export default app;
