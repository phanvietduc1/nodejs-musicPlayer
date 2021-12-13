let mongoose = require('mongoose');

const Playlist = mongoose.model('Playlist', {
    IdPlaylist: {
        type: String,
        required:true
    },
    TenPlaylist: {
        type:String,
        required:true
    },
    HinhPlaylist: {
        type:String,
        required:true
    },
    Casi: {
        type:String,
        required:true
    }
});
module.exports = {Playlist}