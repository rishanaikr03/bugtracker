const mongoose = require('mongoose');
const MongoURI = "mongodb://127.0.0.1:27017/bug_finder"; // Replace 'mydatabase' with your actual database name

const ConnectToMongo = async () => {
    try {
        await mongoose.connect(MongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB successfully");
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
    }
}

module.exports = ConnectToMongo;


// const mongoose = require('mongoose')
// const MongoURI = "mongodb://localhost:27017/"

// const ConnectToMongo = async () => {
//     try {
//         await mongoose.connect(MongoURI);
//         console.log("Connect to Mongo Successfull")
//     }
//     catch(err){
//         console.log("Connect to Mongo Unsuccessfull "+err.message)
//     }
// }

// module.exports=ConnectToMongo
