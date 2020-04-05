import {createAdminUserSeeder} from '~/database/seeds/user';
import mongoose from 'mongoose';
import {MONGO_URI} from '~/utilities/constants'

const dbSeed = async () => {

  console.log(`connecting to ${MONGO_URI}`);

  try {

    await mongoose.connect(`${MONGO_URI}`,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true
      }
    );

    //seeders
    await createAdminUserSeeder();

    console.log('closing connection');
    mongoose.connection.close()
  } catch (error) {
    console.log(error);
  }
};

dbSeed();
