const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SuperclusterSchema = new Schema({
    displayName: String,
    active: { type: Boolean, default: true },
    permanent: { type: Boolean, default: false },
    created: { type: Date, default: Date.now }
});

// Duplicate the ID field.
SuperclusterSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
SuperclusterSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Supercluster', SuperclusterSchema);
