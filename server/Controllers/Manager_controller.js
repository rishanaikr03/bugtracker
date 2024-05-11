const express = require("express")
const Manager = require("../Models/Manager.js")
const Assigns = require("../Models/Assign.js")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Project = require("../Models/Project.js")
const Developer = require("../Models/Developer.js")
const Bug = require("../Models/Bug.js")
const JWT_SECRET = 'hello'

const Register = async (req, res) => {
    try {
        const { name, phone, email, password } = req.body;
        let manager_details = await Manager.findOne({ email })
        let developer_details = await Developer.findOne({ email })
        if (manager_details || developer_details) {
            const success = false;
            return res.status(400).json({ success, error: "Email already exist" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);

        const newManager = new Manager({ name, email, password: secPass, phone });

        const savedManager = await newManager.save()

        const success = true;
        res.json({ success, savedManager })

    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists in the Manager collection
        let user = await Manager.findOne({ email });

        // If not found in Manager, check the Developer collection
        if (!user) {
            user = await Developer.findOne({ email });
        }

        // If user does not exist in either collection, return error
        if (!user) {
            return res.status(400).json({ success: false, error: "Invalid Email or Password" });
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        // If passwords don't match, return error
        if (!passwordMatch) {
            return res.status(400).json({ success: false, error: "Invalid Email or Password" });
        }

        // User is authenticated, generate JWT token
        const data = user.id
        const authtoken = jwt.sign(data, JWT_SECRET)

        // Send success response with token
        res.json({ success: true, authtoken, role: user.role });

    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).send("Internal Server Error");
    }
};


const AddProject = async (req, res) => {
    try {
        const project_image = (req.file) ? req.file.filename : null;
        console.log(project_image, 111)
        const { name, client_name, description, project_type, backend, frontend, start_date } = req.body;

        const newProject = new Project({ name, client_name, backend, frontend, project_type, start_date, description, image: project_image });

        const savedProject = await newProject.save()

        const success = true;
        res.json({ success, savedProject })

    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }
}

const ViewProject = async (req, res) => {
    try {
        let projects;
        if (req.params.id) {
            projects = await Project.findById(req.params.id);
        } else {
            projects = await Project.find();
        }
        const success = true;
        res.json({ success, data: projects });
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }
}
const ViewDeveloper = async (req, res) => {
    try {
        let developer;
        if (req.params.id) {
            developer = await Developer.findById(req.params.id);
        } else {
            developer = await Developer.find();
        }
        const success = true;
        res.json({ success, data: developer });
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }
}

const DeleteProject = async (req, res) => {
    try {
        let deletedProject = await Project.findByIdAndDelete(req.params.id);
        const success = true;
        res.json({ success, data: deletedProject });
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }
}

const UpdateProject = async (req, res) => {
    try {
        const project_image = (req.file) ? req.file.filename : null;
        console.log(project_image, 111)
        const { name, client_name, description, project_type, backend, frontend, start_date } = req.body;

        let updatedProject = await Project.findByIdAndUpdate(req.params.id, {
            name,
            client_name,
            description,
            project_type,
            backend,
            frontend,
            start_date,
            project_image // Assuming project_image is a field in your Project model
        },
            { new: true });
        if (!updatedProject) {
            return res.status(404).json({ success: false, error: 'Project not found' });
        }

        res.json({ success: true, data: updatedProject });

    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }
}

const Assign = async (req, res) => {
    try {
        const { project_id, developer_id } = req.body;

        const assignment = await Assigns.findOne({ p_id: project_id, d_id: developer_id });
        if (assignment) {
            // let dev_check = await Developer.findOne({d_id:developer_id})
            console.log('Assignment found:', assignment);
            return res.json({ success: false }) // Assignment exists
        }
        else {

            let newAssign = new Assigns({ p_id: project_id, d_id: developer_id });
            let savedAssign = await newAssign.save();
            const success = true;
            return res.json({ success, data: savedAssign });
        }
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }

}
const ViewAssign = async (req, res) => {
    try {
        let assign;
        if (req.params.id) {
            assign = await Assigns.find({ p_id: req.params.id }).populate('d_id');
        } else {
            assign = await Assigns.find().populate('d_id');
        }
        const success = true;
        res.json({ success, data: assign });
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }
}


const AllCount = async (req, res) => {
    try {

        const projectCount = await Project.countDocuments();

        const developerCount = await Developer.find({ role: "developer" }).countDocuments();

        const testerCount = await Developer.find({ role: "tester" }).countDocuments();

        const totalBugCount = await Bug.countDocuments();

        const pendingBugCount = await Bug.find({ status: "pending" }).countDocuments();

        const completedBugCount = await Bug.find({ status: "completed" }).countDocuments();

        console.log(pendingBugCount)

        const progress = (completedBugCount / totalBugCount)

        const success = true;
        res.json({ success, projectCount, developerCount, testerCount, totalBugCount, pendingBugCount, completedBugCount, progress });
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }

}




module.exports = { ViewAssign, AddProject, Login, Register, ViewProject, DeleteProject, UpdateProject, Assign, ViewDeveloper, AllCount }