import mongoose from "mongoose";

const actorSchema = new mongoose.Schema({
    fullName: String,
    age: Number,
    gender: String,
    avatar: String,
    physical_information: {
        height: Number,
        weight: Number,
        eyes: String,
    },
    social: {
        facebook: String,
        linkedIn: String,
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CastAgency"
    }
});

const Actor = mongoose.model("Actor", actorSchema);

export default Actor;