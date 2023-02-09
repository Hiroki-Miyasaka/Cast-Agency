import mongoose from "mongoose";

const castAgencySchema = new mongoose.Schema({
    name: String,
    location: String,
    phoneNumber: String,
    website: String,
    email: String,
    bio: String,
    logo: String,
    since: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    actors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Actor"
        }
    ]
})

const CastAgency = mongoose.model("CastAgency", castAgencySchema);

export default CastAgency;