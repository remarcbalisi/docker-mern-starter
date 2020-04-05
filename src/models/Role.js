import mongoose from 'mongoose';
import RoleSchema from './mongooseSchema/RoleSchema';

export default mongoose.model('Role', RoleSchema);
