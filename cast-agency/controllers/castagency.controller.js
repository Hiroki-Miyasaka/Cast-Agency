import CastAgency from "../models/castagency.model.js";
import mongoose from "mongoose";
import User from "../models/user.model.js";

export const createAgency = async (req, res) => {
    const { name, location, phoneNumber, website, email, bio, logo, since } = req.body;

    // false: null, undefined, 0, "", false, NaN
    // true: "0", "false", [], {}

    if(!name || !location || !phoneNumber || !website || !email || !bio || !logo || !since){
        return res.status(400).json({
            status: "fail",
            message: "Please provide all required fields!"
        })
    }

    try {
        const cast = {
            name,
            location,
            phoneNumber,
            website,
            email,
            bio,
            logo,
            since,
            user: req.user
        };
        const newAgency = await CastAgency.create(cast);

        const user = await User.findByIdAndUpdate(req.user, 
            { $push: { agencies: newAgency._id }}, { new: true }
            );

        res.status(201).json({
            status: "success",
            data: newAgency,
            user
        });
        
    } catch(err) {
        res.status(500).json({
            status: "fail",
            message: "Something went wrong!",
            err
        })
    }
}

export const getAgencies = async (req, res) => {
    try{
        const cast = await CastAgency.find();
        // const cast = await CastAgency.find().populate("actors");
        // populate will return the information from the actor id
        res.status(200).json({
            status: "success",
            agencies: cast
        })
    }catch(err) {
        res.status(500).json({
            status: "fail",
            message: "Something went wrong!",
            err
        })
    }
}

export const getAgency = async (req, res) => {
    const { id } = req.params;
    
    try {
        const agency = await CastAgency.findById(id);

        if(!agency) return res.status(404).json({ status: "fail", message: "The is no cast agency with this id"});

        res.status(200).json({
            status: "success",
            agency
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Something went wrong!",
            error
        })
    }
}

export const updateAgency = async (req, res) => {
    const { id } = req.params;

    const castUpdate = req.body;

    try {
        // const agency = await CastAgency.findByIdAndUpdate({ _id: id}, castUpdate); return document
        await CastAgency.updateOne({ _id: id}, castUpdate); //process information

        if(!agency) return res.status(404).json({ status: "fail", message: "The is no cast agency with this id"});

        res.status(200).json({
            status: "success",
            message: "Information updated successfully!",
        })

    } catch (error) {
        res.status(200).json({
            status: "fail",
            message: "Something went wrong!",
            error
        })
    }
};

export const deleteAgency = async (req, res) => {
    const { id } = req.params;

    try {
        await CastAgency.findByIdAndRemove(id);

        res.status(200).json({
            status: "success",
            message: "agency deleted successfully!"
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Something went wrong!",
            error
        })
    }
};