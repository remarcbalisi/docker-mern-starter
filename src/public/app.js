import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import {MONGO_URI, PORT} from '~/utilities/constants'
import bodyParser from 'body-parser';
import graphqlHTTP from 'express-graphql';
import {schema} from '~/graphql/schema/index';
import Authentication from '~/middleware/Authentication';

const app = express();
app.use(bodyParser.json());
app.use(Authentication);

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

const App = async () => {
  //CONNECT TO DB
  try {

    await mongoose.connect(`${MONGO_URI}`,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true
      }
    );

    console.log('connected to database 🖥');
    console.log('Welcome to Express JS 🥳🥳🥳');

    app.listen(PORT);
    console.log(`Running on http://localhost:${PORT}`);

  } catch (error) {
    console.error(`Cannot connect to Database: ${error} \nReconnecting...`);
    App();
  }
};

App();
