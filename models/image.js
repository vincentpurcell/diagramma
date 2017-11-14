const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const ImageSchema = new Schema({
    filename: String,
    designer: String,
    votes: [
        new Schema({timestamp: {type: Date, default: Date.now}})
    ],
    created: { type: Date, default: Date.now }
});

// Duplicate the ID field.
ImageSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
ImageSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Image', ImageSchema);
