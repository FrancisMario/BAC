const mongoose = require('mongoose');

let BusinessSchema = mongoose.Schema({
  businessName:{
    type:String,
    required:true
  },
  yearFounded:{
    type:Number
  },
  businessId:{
    type:String,
    required:true
  },
  businessPhone:{
    type:Object
  },
  password:{
    type:String,
    required:true
  },
  business_email:{
    type:String,
    required:true
  },
  branches:{
    type:Object,
    require:true
  },
  account:{
    type:Object,
    require:true
  }  
})


module.exports = mongoose.model('Business', BusinessSchema);