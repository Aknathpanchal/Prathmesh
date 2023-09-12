const mongoose=require("mongoose")
const demoInfoSchema=new mongoose.Schema({
  company:String,
  form:String,
  status:String,
  itemId:String,
})

const demoInfoModel=mongoose.model("demoInfo",demoInfoSchema)
module.exports= demoInfoModel