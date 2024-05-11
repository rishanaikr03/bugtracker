const ConnectToMongo = require("./db")
const express = require("express")
ConnectToMongo();

const app = express();
const port = 5005;
const cors = require('cors')

app.use(cors());

app.use(express.json())

const Manager = require("./Routes/Manager_route");
const Developer = require("./Routes/Developer_route");
const Bug = require("./Routes/Bug_route");
// const User = require("./Routes/User_route");


app.get("/test",(req,res)=>{
    res.send("Tesing...");
})

// static path for profile pic
app.use("/api/image/",express.static("./uploads"))
//////////////////////////

// app.use("/api/admin",Admin);
app.use("/api/manager",Manager);

app.use("/api/developer",Developer);

app.use("/api/bug",Bug);
// app.use("/api/user",User);


app.listen(port,()=>{
    console.log("App listening on port :"+port)
})


