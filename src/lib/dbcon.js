//dependencies
import mongoose from "mongoose";

//db connection
export const connectToDB = async () => {
  const conncetion = {};
  try {
    if (conncetion.isConnected) return;
    //db connection
    const db = await mongoose.connect(process.env.MONGO_URI);
    conncetion.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
