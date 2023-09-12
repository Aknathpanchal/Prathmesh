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
    origin: ['https://abhilash-wlc.github.io','http://localhost:3000'], // Allow requests only from this origin
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

app.post("/createinfo",async(req,res)=>{
    const {company, form, status, itemId}=req.body
    console.log("name,age,body",company, form, status, itemId)
    const data=new demoInfoModel({
        company, form, status, itemId
    })
   
    await data.save()
    res.end("success")
})

app.put("/updateinfo",async(req,res)=>{
    const {itemId,newStatus}=req.body
    console.log("name,age,body", itemId)
   await demoInfoModel.updateOne({ itemId: itemId },{ $set: { status: newStatus } })
   
    // await data.save()
    res.end("Update Success")
})


app.post("/checkitem",async(req,res)=>{
    const {itemId}=req.body
    console.log("name", itemId)
    if(itemId){
        console.log("namerttt", itemId)
        const data= await demoInfoModel.find({itemId})
        if(data){
            console.log("namerrrrrrr", itemId)
          res.end(JSON.stringify({isExists: true}))
      }else{
        console.log("nam555555", itemId)
              res.end(JSON.stringify({isExists: false}))
          }
    }else{
        console.log("nam8888e", itemId)
        res.end(JSON.stringify({isExists: false}))
    }
  })

  
app.post("/getItemById",async(req, res) => {
const {itemId}= req.body
const data= await demoInfoModel.find({itemId})
res.end(JSON.stringify(data))
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