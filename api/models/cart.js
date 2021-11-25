const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const bcrypt   = require('bcryptjs');

const Cart = new Schema({
    id_user: {
        type    : String,
        trim    : true,
        required: [true, 'L\id est obligatoire']
    },
    phones: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Phone"
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Cart', Cart);