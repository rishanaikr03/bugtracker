const express = require("express");
const router = express.Router()
const { AddProject, Register, Login, ViewProject, DeleteProject } = require("../Controllers/Developer_controller.js")
const Developer = require("../Middleware/Developer_middleware");

router.post("/register", Register)

router.post("/login", Login)

router.post("/add-project", Developer, AddProject)

// router.get("/view-project", Developer, ViewProject)

router.get("/view-project", ViewProject)

// router.delete("/delete-project/:id", Developer, DeleteProject)


module.exports = router