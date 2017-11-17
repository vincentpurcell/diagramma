const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    username: String,
    displayName: String,
    password: String,
    admin: { Boolean, default: false },
    active: { Boolean, default: false },
    moderator: { Boolean, default: false },
    isDesigner: Boolean,
    permanent: { Boolean, default: false },
    created: { type: Date, default: Date.now },
    lastLogin: Date,
    superclusters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supercluster'
    }],
});

// Duplicate the ID field.
UserSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
UserSchema.set('toJSON', {
    virtuals: true
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
