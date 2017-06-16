import express from 'express';

const app = express();


app.get('/', (req, res) => {
  res.json('bora pra acción');
});

export { app };
