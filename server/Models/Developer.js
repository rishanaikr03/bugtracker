const mongoose = require("mongoose");
const {Schema} = mongoose

const DeveloperSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    role:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("Developer", DeveloperSchema);