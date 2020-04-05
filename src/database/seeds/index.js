import CreateAdminUserSeeder from '~/database/seeds/user';
import CreateRoleSeeder from '~/database/seeds/role';
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
    await CreateRoleSeeder();
    await CreateAdminUserSeeder();

    console.log('closing connection');
    mongoose.connection.close()
  } catch (error) {
    console.log(error);
  }
};

dbSeed();
