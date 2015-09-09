var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MaterialSchema   = new Schema({
    materialnumber: Number,
    materialdescription: String
});

module.exports = mongoose.model('Material', MaterialSchema);
