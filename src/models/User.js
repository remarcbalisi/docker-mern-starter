import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema({
  firstName: String,
  email: String,
});

export default mongoose.model('User', User);
