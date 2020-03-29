import express from 'express';
import mongoose from 'mongoose';
import('dotenv');
import {MONGO_URI, PORT} from '~/utilities/constants'
import bodyParser from 'body-parser';
import graphqlHTTP from 'express-graphql';
import {buildSchema} from 'graphql';

const app = express();
app.use(bodyParser.json());

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
  hello: () => {
    return 'hello world.';
  }
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.get('/', (req, res) => {
  res.send('Hello World');
});

mongoose.connect(`${MONGO_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(PORT);
console.log(`Running on http://localhost:${PORT}`);
