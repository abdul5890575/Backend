const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var LeadersSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    
    designation: {
        type: String,
        required: true
    },

    abbr: {
        type: String,
        required: true
    },

    image:{
        type: String,
        required: true,
    },
   
   
    featured:{
        type: Boolean,
        default: false,
    },
  
}, 

{
    timestamps: true
});


var Leaders = mongoose.model('leader', LeadersSchema);

module.exports = Leaders;