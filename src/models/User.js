import mongoose from 'mongoose';
import UserSchema from './mongooseSchema/UserSchema';

export default mongoose.model('User', UserSchema);
