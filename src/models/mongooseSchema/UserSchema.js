import mongoose from 'mongoose';
import Role from '~/models/Role';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: {
    type: String,
    select: false,
  },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Role'
    }
  ]
}, {timestamps: true});

export default UserSchema;