import mongoose, { Mongoose } from 'mongoose';
import { getMongoConfig } from '@/lib/mongodb-config';

declare global {
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  } | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  const c = cached!;
  if (c.conn) {
    return c.conn;
  }

  if (!c.promise) {
    const { uri, options } = getMongoConfig();

    c.promise = mongoose.connect(uri, options).then((m) => {
      return m;
    });
  }

  try {
    c.conn = await c.promise;
  } catch (e) {
    c.promise = null;
    throw e;
  }

  return c.conn;
}

export default connectToDatabase;
