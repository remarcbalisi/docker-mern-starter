import express from 'express';
import mongoose from 'mongoose';
import('dotenv');
import { MONGO_URI, PORT } from '~/utilities/constants'

const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

mongoose.connect(`${MONGO_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(PORT);
console.log(`Running on http://localhost:${PORT}`);
