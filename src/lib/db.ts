import mongoose, { mongo } from 'mongoose';

const url = process.env.MONGO_URI as string;
let connection: typeof mongoose;

const startDB = async () => {
  try {
    if (!connection) await mongoose.connect(url);

    return connection;
    console.log(`MongoDB connected`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  return connection;
};

export default startDB;
