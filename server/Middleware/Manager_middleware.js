const express = require("express");
const JWT_SECRET = "hello";
const jwt = require("jsonwebtoken");

const ManagerMiddleware = async (req,res,next)=>{
    const token = req.header("auth-token");
    if(!token){
        return res.status(401).send({error: "please authenticate using a valid token"})
    }
    try{
        const data = jwt.verify(token, JWT_SECRET)
        req.manager = data.manager;
        console.log(req.manager)
        next();
    }
    catch(err){
        console.log(err.message);
        res.status(401).send({error: "catch: please authenticate using a valid token"})

    }

}

module.exports= ManagerMiddleware