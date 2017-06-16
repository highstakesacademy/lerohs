import express from 'express';
import mongoose from 'mongoose';


const app = express();

app.get('/', (req, res) => {
  res.sendfile('front/index.html')
});

app.get('/admin', (req, res) => {
  res.sendfile('front/admin.html');
});



export { app };
