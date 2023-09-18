import mongoose from 'mongoose';

export default async function connectDB() {
  try {
    const MONGO_URI = process.env.MONGODB_URI as string;
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGO_URI);
      console.log('DB Connected');
    }
  } catch (error) {
    console.log(error);
  }
}

// import mongoose, { mongo } from 'mongoose';

// const url = process.env.MONGO_URI as string;
// let connection: typeof mongoose;

// const startDB = async () => {
//   try {
//     if (!connection) await mongoose.connect(url);

//     return connection;
//     console.log(`MongoDB connected`);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }

//   return connection;
// };

// export default startDB;
