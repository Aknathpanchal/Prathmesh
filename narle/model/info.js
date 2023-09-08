const mongoose=require("mongoose")
const demoInfoSchema=new mongoose.Schema({
  name:String,
  age:Number,
  address:String
})

const demoInfoModel=mongoose.model("demoInfo",demoInfoSchema)
module.exports= demoInfoModel