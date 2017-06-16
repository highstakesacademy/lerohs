import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.use(express.static('assets'));

app.get('/', (req, res) => {
  res.sendfile('front/index.html')
});

app.get('/admin/dashboard', (req, res) => {
  res.sendfile('front/admin/dashboard.html');
});

export { app };
