import mongoose from "mongoose";
import Actor from  "../models/actor.model.js";
import CastAgency from "../models/castagency.model.js";

export const getAllActors = async (req, res) => {
    try {
        const actors = await Actor.find();
        res.status(200).json({
            status: "success",
            actors
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Something went wrong!"
        })
    }
}

export const getActor = async (req, res) => {
    const { id } = req.params;

    try {
        const actor = await Actor.findById(id);

        res.status(200).json({
            status: "success",
            actor
        })

    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Something went wrong!"
        })
    }
}

export const createActor = async (req, res) => {
    const actor = req.body;

    if(!actor.fullName || !actor.gender) {
        return res.status(400).json({
            status: "fail",
            message: "Please provide required fields!"
        })
    }

    try {
        
        const newActor = new Actor(actor);

        await newActor.save().then(
            (res) => {
                CastAgency.findByIdAndUpdate(
                    actor.agent,
                    { $push: { actors: res._id }},
                    {new: true},
                    (err, updatedCast) => {
                        if(err) console.log(err);
                        console.log(updatedCast);
                    }
                )
            }
        ).catch(err => console.log(err)) 
        res.status(201).json({
            status: "success",
            message: "actor created successfully"
        });

    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Something went wrong!"
        })
    }
}

export const updateActor = async (req, res) => {
    const { id } = req.params;

    const actorData = req.body;

    try {
        const actor = await Actor.findByIdAndUpdate({ _id: id }, actorData, {new: true});

        res.status(200).json({
            status: "success",
            message: "update actor is successfull!",
            actor
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Something went wrong!",
            error
        })
    }
}

export const deleteActor = async (req, res) => {
    const { id } = req.params;

    try {
        await Actor.findByIdAndRemove(id).then(
            (res) => {
                CastAgency.findByIdAndUpdate(res.agent, {
                    $pull : { actors: res._id }}, {new: true}, (err, reply) => {
                        // push: push is used to add the value to the array
                        // pull: pull is used to remove the value from the array
                        // pop: pop is used to remove the last value from the array
                        if(err) console.log(err);
                        console.log(reply);
                    })
            }
        );
        res.status(200).json({
            status: "success",
            message: "actor deleted successfully!"
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Something went wrong!"
        })
    }
}