import mongoose from 'mongoose';

import Users from './seeders/users.seeders';
import Homes from './seeders/homes.seeders';

const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/dbname';

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
export const seedersList = {
 Users,
 Homes
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
export const connect = async () =>
  await mongoose.connect(mongoURL, { useNewUrlParser: true });
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
export const dropdb = async () => mongoose.connection.db.dropDatabase();
