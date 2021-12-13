let mongoose = require('mongoose');

const Artist = mongoose.model('Artist', {
    IdNgheSi: {
        type: String,
        required:true
    },
    TenNgheSi: {
        type:String,
        required:true
    },
    HinhNgheSi: {
        type:String,
        required:true
    }
});
module.exports = {Artist}