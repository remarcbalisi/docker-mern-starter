import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: {
    type: String,
    select: false,
  }
}, {timestamps: true});

export default mongoose.model('User', User);
