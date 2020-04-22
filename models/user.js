const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
  businessName:{
    type:String,
    required:true
  },
  yearFounded:{
    type:Number,
    required:true
  },
  businessId:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
})

module.exports = mongoose.model('User', userSchema);