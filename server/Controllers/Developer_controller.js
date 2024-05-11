const express = require("express")
const Developer = require("../Models/Developer.js")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Project = require("../Models/Project.js")
const Assign = require("../Models/Assign.js")
const JWT_SECRET = 'hello'
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Register = async (req, res) => {
    try {
        const { name, phone, address, gender, email, password, role } = req.body;
        let developer_details = await Developer.findOne({ email })
        if (developer_details) {
            const success = false;
            return res.status(400).json({ success, error: "Email already exist" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);

        const newDeveloper = new Developer({ name, email, password: secPass, phone, address, gender, role });

        const savedDeveloper = await newDeveloper.save()

        const success = true;
        res.json({ success, savedDeveloper })

    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        let developer_details = await Developer.findOne({ email });
        if (!developer_details) {
            const success = false;
            return res.status(400).json({ success, error: "Invalid Email or Password" })
        }
        const passwordCompare = await bcrypt.compare(password, developer_details.password)
        if (!passwordCompare) {
            const success = false;
            return res.status(400).json({ success, error: "Invalid Email or Password" })
        }
        const data = developer_details.id

        console.log(data, 111)

        const authtoken = jwt.sign(data, JWT_SECRET);

        const success = true;
        res.json({ success, authtoken })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Error!!!");
    }
}


const AddProject = async (req, res) => {
    try {
        const { name, description, image } = req.body;
        // let developer_details = await Developer.findOne({ email })
        // if (developer_details) {
        //     const success = false;
        //     return res.status(400).json({ success, error: "Email already exist" })
        // }

        const newProject = new Project({ name, description, image });

        const savedProject = await newProject.save()

        const success = true;
        res.json({ success, savedProject })

    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }
}

const ResetPassword = async (req, res) => {
    try {
        const { id } = req.params
        const { resetPassword } = req.body
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(resetPassword, salt);
        const reset = await Developer.findByIdAndUpdate(id, { password: secPass }, { new: true });
        if (!reset) {
            // Handle the case where no developer was found with the given ID
            return res.status(404).json({ success: false, error: "Developer not found" });
        }
        const success = true;
        res.json({ success, reset });
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }

}

const ViewProject = async (req, res) => {
    try {
        const token = req.header("auth-token");

        if (!token) {
            return res.status(401).json({ error: "Please authenticate using a valid token" });
        }

        const userData = jwt.verify(token, JWT_SECRET);

        // Retrieve assignments for the authenticated developer (using d_id from token data)
        const assignments = await Assign.find({ d_id: userData });
        console.log(assignments,111)

        // Extract p_id values from assignments to find associated projects
        const projectIds = assignments.map(assign => assign.p_id);

        // Find projects based on the extracted projectIds
        const projects = await Project.find({ _id: { $in: projectIds } });

        // Prepare the response
        const success = true;
        return res.json({ success, data: projects });
    } catch (error) {
        console.error("Error in ViewProject:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const DeleteDeveloper = async (req, res) => {
    try {
        let deletedDev = await Developer.findByIdAndDelete(req.params.id);
        const success = true;
        res.json({ success, data: deletedDev });
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }
}






module.exports = {ResetPassword, AddProject, Login, Register, ViewProject, DeleteDeveloper }