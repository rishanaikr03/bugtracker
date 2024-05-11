const express = require("express");
const JWT_SECRET = "hello";
const jwt = require("jsonwebtoken");

const DeveloperMiddleware = async (req,res,next)=>{
    const token = req.header("auth-token");
    if(!token){
        return res.status(401).send({error: "please authenticate using a valid token"})
    }
    try{
        console.log(token)
        const data = jwt.verify(token, JWT_SECRET)
        req.developer = data;
        console.log(req.developer)
        next();
    }
    catch(err){
        console.log(err.message);
        res.status(401).send({error: "catch: please authenticate using a valid token"})

    }

}

module.exports= DeveloperMiddleware