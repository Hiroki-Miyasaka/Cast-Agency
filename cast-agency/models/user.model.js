import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: [ "AGENCY", "ACTOR", "DIRECTOR", "USER" ],
        default: "USER"
    },
    agencies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CastAgency"
        }
    ],
    actor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Actor"
    }
});

const User = mongoose.model("User", userSchema);

export default User;
