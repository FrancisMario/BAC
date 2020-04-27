/**
 * List of classes used to generate random identifiers
 */
const crypto = require("crypto");


export  function generateBusinessId(key){
    return crypto.createHash('md5').update(key).digest("hex");
 }