const mongoose = require('mongoose');
/**
 * Address
 */
let branch = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  discription:{
    type:String,
    required:true
  },
  coordinates:{
    type:String,
    required:true,
  }
})

module.exports = mongoose.model('Branch',branch);