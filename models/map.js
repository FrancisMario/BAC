const mongoose = require('mongoose');

let addressSchema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  discription:{
    type:String,
    required:true
  },
  google_address:{
    type:String,
    required:true
  },
  coordinates:{
    type:Object,
    required:true
  }
})


module.exports = mongoose.model('address', addressSchema);