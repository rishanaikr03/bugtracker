const express = require("express");
const router = express.Router()
const { AllCount, ViewDeveloper, AddProject, Register, Assign, Login, ViewProject, DeleteProject, UpdateProject, ViewAssign } = require("../Controllers/Manager_controller.js")
const Manager = require("../Middleware/Manager_middleware");

const multer = require('multer');

const { DeleteDeveloper, ResetPassword } = require("../Controllers/Developer_controller.js");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + "-" + file.originalname)
    }
})
// var fs = require('fs');
// var dir = './tmp';

// if (!fs.existsSync(dir)){
//     fs.mkdirSync(dir);
// }

const upload = multer({ storage: storage })



router.post("/register", Register)

router.post("/login", Login)

router.get("/view-developer", ViewDeveloper)

router.delete("/delete-developer/:id", DeleteDeveloper)

router.post("/add-project", upload.single('project_image'), AddProject)

router.get("/view-project", ViewProject)

router.put("/reset-password/:id", ResetPassword)

router.get("/view-project/:id", Manager, ViewProject)

router.delete("/delete-project/:id", DeleteProject)

router.put("/edit-project/:id", upload.single('project_image'), UpdateProject)

router.post("/assign-project", Assign)

router.get("/view-assign/:id", ViewAssign)

router.get("/all-count", AllCount)




module.exports = router