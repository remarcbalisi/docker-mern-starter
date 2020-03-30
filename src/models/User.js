import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  createdAt: String
});

export default mongoose.model('User', User);
