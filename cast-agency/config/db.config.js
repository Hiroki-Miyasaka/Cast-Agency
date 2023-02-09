import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let db = mongoose.connect(process.env.MONGO_HOST, {
    useNewUrlParser: true,
    // useNewUrlParse is a flag that tells the parser to use the new, updated,
    useUnifiedTopology: true,
    // useUnifiedTopology is a flag that tells the driver to use the new Server Discover and Monitoring engine.
}, (err) => {
    if(err) {
        console.log("Error: " + err);
    } else {
        console.log("Connected to MongoDB...");
    }
});

export default db;