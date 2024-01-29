import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  try {
    if (cached.conn) return cached.conn;

    if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

    cached.promise =
      cached.promise ||
      mongoose.connect(MONGODB_URI, {
        dbName: "evently",
        bufferCommands: true,
      });
    cached.conn = await cached.promise;
    console.log("connecting to data base", cached);

    return cached.conn;
  } catch (e) {
    console.log("connecting to data base", e);
  }
};
