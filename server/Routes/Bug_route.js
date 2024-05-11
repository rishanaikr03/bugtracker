const express = require("express");
const router = express.Router()
const { AddBug, ViewBug, DeleteBug, SolveBug } = require("../Controllers/Bug_controller.js")
const Developer = require("../Middleware/Developer_middleware");
const multer = require('multer');

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

const upload = multer({ storage: storage })

router.post("/add-bug/:pid",Developer, upload.single('image'), AddBug)

router.put("/solve-bug/:id", SolveBug)

// router.get("/view-bug", ViewBug)

router.get("/view-bug/:id", ViewBug)

router.delete("/delete-bug/:id", Developer, DeleteBug)


module.exports = router