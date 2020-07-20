"use strict"

var Project = require("../models/project");
var fs = require("fs");
var path = require("path");

var controller = {
    home: function(req , res){
        return res.status(200).send({
            mensaje : "este es el home"
        });
    },
    test: function(req , res){
        return res.status(200).send({
            mensaje : "este es la pagina test"
        })
    },
    saveProject: function(req, res){
        var project = new Project;
        var params = req.body;

        project.name = params.name;
        project.description = params.description;
        project.started = params.started;
        project.completed = params.completed;
        project.service = params.service;
        project.image = null;
        project.image2 = null;
        project.image3 = null;

        project.save((err, projectStored) =>{
           if (err) return res.status(500).send({message:"there was a error at the process"}); 

           if (!projectStored) return res.status(404).send ({message: "the document could not be found"});

           return res.status(200).send({project: projectStored})

        })

    },

    getProject: function(req, res){
        var projectId = req.params.id;
        
       Project.findById(projectId,(err, project)=> {
           
        if (err) return res.status(500).send({message:"there was a error with the request"}); 

        if (!project) return res.status(404).send({message:"the project could not be found"}); 

        return res.status(200).send({project});
       });
    


    },

    getProjects: function(req , res){
        Project.find({}).exec((err , projects)=> {
        
            if (err) return res.status(500).send({message:"there was a fucking error "}); 

            if (!projects) return res.status(404).send({message:"No project could not be found"}); 
    
            return res.status(200).send({projects});

        });
        
    },
    updateProject: function(req , res){
        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId,update,{new:true},(err , projectUpdated)=> {
        
            if (err) return res.status(500).send({message:"there was a fucking error "}); 

            if (!projectUpdated) return res.status(404).send({message:"No project could not be found"}); 
    
            return res.status(200).send({projectUpdated});

        });
        
    },
    removeProject: function(req , res){
        var projectId = req.params.id;
       

        Project.findByIdAndRemove(projectId,(err , projectRemoved)=> {
        
            if (err) return res.status(500).send({message:"there was a fucking error "}); 

            if (!projectRemoved) return res.status(404).send({message:"No project could not be found"}); 
    
            return res.status(200).send({projectRemoved});

        });
        
    },
    uploadimage: function(req, res){
        var projectId = req.params.id;
        var fileName = "imagen no disponible";


        if (req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split("\\");
            var fileName = fileSplit[1];
            var extSplit = fileName.split("\.");
            var fileExt = extSplit[1];

            if(fileExt == "png" || fileExt == "jpg" || fileExt == "jpeg" || fileExt == "gif"){

                Project.findByIdAndUpdate(projectId,{image: fileName},{new:true},(err, projectUpdated)=>{
                    if (err) return res.status(500).send({message:"there was a fucking error "}); 
    
                if (!projectUpdated) return res.status(404).send({message:"No project could not be found"}); 
        
                return res.status(200).send({project: projectUpdated});
                });
    
            }else{
                fs.unlink(filePath, (err)=>{
                    return res.status(200).send({
                        message: "la extension no es valida"
                    });

                });
                

            }

            
           
        }else{
            return res.status(200).send({message: fileName});
        }
    },
   
    
    getImageFile: function(req,res){
        var file = req.params.image;
        var path_file = "./uploads/" + file;

        fs.exists(path_file,(exists)=>{
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(200).send({
                    message : "no existe la imagen..."
                });
            }
        })
    } 


};
module.exports = controller;