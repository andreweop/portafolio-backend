"use strict"
var express = require("express");
var projectController = require("../controllers/project");

var router = express.Router();
var multipart = require("connect-multiparty");
var multipartmiddleware = multipart({uploadDir: "./uploads"});

router.get("/home", projectController.home);
router.post("/test", projectController.test);
router.post("/save-project", projectController.saveProject);
router.get("/project/:id", projectController.getProject);
router.get("/projects", projectController.getProjects);
router.put("/update/:id", projectController.updateProject);
router.delete("/remove/:id", projectController.removeProject);
router.post("/upload-image/:id", multipartmiddleware, projectController.uploadimage)
router.get("/get-image/:image", projectController.getImageFile);
module.exports = router;