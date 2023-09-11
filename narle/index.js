const express = require('express');
const https = require('https');
const mongoose=require('mongoose')
const demoInfoModel=require("./model/info.js")
const fs = require('fs');
const cors=require("cors")
const app=express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
// const options = {
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('cert.pem'),
//   };
// const server = https.createServer(options, app);

// app.use(cors({
//     origin: 'https://abhilash-wlc.github.io/outlook-web-addin',
//   }));

const corsOptions = {
    origin: 'https://abhilash-wlc.github.io/outlook-web-addin', // Allow requests only from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these HTTP methods
    optionsSuccessStatus: 204, // No content response for preflight requests
  };

  app.use(cors(corsOptions));

const dburl="mongodb+srv://Prathmesh11:Prathmesh11@cluster0.o4lbk.mongodb.net/test"


const connectionparams={
    useNewUrlParser:true,
    useUnifiedTopology:true
}
mongoose.connect(dburl,connectionparams).then(()=>{
    console.log("connected to db");
}).catch((er)=>{
    console.log(er)
})
app.get("/",(req,res)=>{
    console.log("Find Prathmesh wife name?");
    res.end("hello world ")
})

app.post("/saveinfo",async(req,res)=>{
    const {name,age,address}=req.body
    console.log("name,age,body",name,age,address)
    const data=new demoInfoModel({
        name,
        age,
        address
    })
   
    await data.save()
    res.end("success")
})

app.get("/getinfo",async(req,res)=>{
  console.log("entered");
    const data= await demoInfoModel.find({})

    res.end(JSON.stringify(data))
})
app.listen(8080,()=>{
    console.log("server started on 808");
})



// server.listen(8080, () => {
//     console.log(`Server is running on https://localhost:8080`);
//   });