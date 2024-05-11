const express = require("express")
const Bug = require("../Models/Bug.js")
const JWT_SECRET = "hello";
const jwt = require("jsonwebtoken");

const AddBug = async (req, res) => {
    try {
        console.log(req.developer)
        const bug_image = (req.file) ? req.file.filename : null;
        const { error_code, error_type, error_message, severity_level, description } = req.body;
        const { pid } = req.params;

        const token = req.header("auth-token");
        if (!token) {
            return res.status(401).send({ error: "please authenticate using a valid token" })
        }
        else {

            const data = jwt.verify(token, JWT_SECRET);

            const newBug = new Bug({ p_id: pid, d_id: data,sd_id:req.developer, error_code, error_type, error_message, severity_level, description, image: bug_image, status: "pending" });

            const savedBug = await newBug.save()

            const success = true;
            return res.json({ success, savedBug })
        }




    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }
}

const ViewBug = async (req, res) => {
    try {
        let bugs = await Bug.find({ p_id: req.params.id }).populate('sd_id');
        const success = true;
        res.json({ success, data: bugs });
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }
}

const DeleteBug = async (req, res) => {
    try {
        let deletedBug = await Bug.findByIdAndDelete(req.params.id);
        const success = true;
        res.json({ success, data: deletedBug });
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }
}


const SolveBug = async (req, res) => {
    try {
        const token = req.header("auth-token");
        if (!token) {
            return res.status(401).send({ error: "please authenticate using a valid token" })
        }
        else {
            let data = jwt.verify(token, JWT_SECRET);
            let solvedBug = await Bug.findByIdAndUpdate(req.params.id, { status: "completed", sd_id: data }, { new: true }).populate("sd_id");
            const success = true;
            return res.json({ success, data: solvedBug });
        }
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }
}






module.exports = { AddBug, ViewBug, DeleteBug, SolveBug }