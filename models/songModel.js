let mongoose = require('mongoose');

const Song = mongoose.model('Song', {
    caSi: {
        type: String,
        required:true
    },
    hinhBaiHat: {
        type:String,
        required:true
    },
    idNgheSi: {
        type:String,
        required:true
    },
    idBaiHat: {
        type:String,
        required:true
    },
    idPlayList: {
        type:String,
        required:true
    },
    idTheLoai: {
        type:String,
        required:true
    },
    linkBaiHat: {
        type:String,
        required:true
    },
    luotThich: {
        type:String,
        required:true
    },
    tenBaiHat: {
        type:String,
        required:true
    }
});
module.exports = {Song}