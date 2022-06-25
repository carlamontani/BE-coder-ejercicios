import dotenv from "dotenv";

dotenv.config();

import mongoose from "mongoose";


mongoose.connect(process.env.MONGO_URI, (err) => {
  if (err) {
    console.log("❌ Error:" + err);
  } else {
    console.log("🚀 Connected to MongoDB");
  }
});

export default mongoose;