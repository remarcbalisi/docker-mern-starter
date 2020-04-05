// Constants
import 'dotenv/config';

export const PORT = 3000;
export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;
export const DB_NAME = process.env.DB_NAME;
export const SECRET_KEY = process.env.SECRET_KEY;

export const MONGO_URI = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`;
