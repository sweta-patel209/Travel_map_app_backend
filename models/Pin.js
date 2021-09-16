const mongoose = require("mongoose");
require('mongoose-double')(mongoose);
var uniqueValidator = require('mongoose-unique-validator');

var SchemaTypes = mongoose.Schema.Types;
const PinSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
        
              
    },
    title:{
        type:String,
        require:true,
        max:3        
    },
    desc:{
        type:String,
        require:true,
        min:3
    },
    rating:{
        type:Number,
        require:true,
        min:0,
        max:5
    },
    lat:{
        type: SchemaTypes.Double,
        require:true
    },
    long:{
        type: SchemaTypes.Double,
        require:true
    }
},

{timestamps:true}
);

PinSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Pin", PinSchema)