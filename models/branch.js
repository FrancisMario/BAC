const mongoose = require('mongoose');
const Address = require('./address');
/**
 * Business Branch
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
  address:{
    type:Address.Address,
    required:true
  }
})

module.exports = Branch = mongoose.model('branch',branch);