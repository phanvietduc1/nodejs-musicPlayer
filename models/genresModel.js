let mongoose = require('mongoose');

const Genres = mongoose.model('Genres', {
    IdChuDe: {
        type: String,
        required:true
    },
    TenChuDe: {
        type:String,
        required:true
    },
    HinhChuDe: {
        type:String,
        required:true
    }
});
module.exports = {Genres}