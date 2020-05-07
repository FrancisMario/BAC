/**
 * ADminConfig Schema for site administrators
 * NOTE: REPLACES USER.JS 
 */

const mongoose = require('mongoose');

let AdminSchema = mongoose.Schema({
    //ADmin credentials
    systemId: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    /**
     * since we love addresses so much, 
     * why not we track our staff's addresses 
     */
    homeAddress: {
        type: String,
        required: false
    }
    ,
    /**
     * admin access group eg. accountants, tech support, collectors etc.
     * groups admin users in different access levels for better security
     */
    adminGroup: {
        type: String,
        required: true
    },
    /**
     * Special access features for individaul admins apart from their access group features 
     * TODO => We will further implement this feature on the second version of the system.
     */
    accessible_features: {
        type: Object,
    },
});


/**
 * Admin Credentials
 * The credentials of the particular admin user.

let Credential = mongoose.Schema({
    /**  a unique System wide Id for identification
     * TODO => make a unique system id generator in the id_generator module 
    

});
**/

module.exports = mongoose.model('AdminConfig', AdminSchema);