const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const bcrypt   = require('bcryptjs');

const Phone = new Schema({
    name: {
        type    : String,
        trim    : true,
        required: [true, 'Le nom est obligatoire']
    },
    image: {
        type: String,
        trim: true
    },
    prix: {
        type     : Number,
        trim     : true,
        required : [true, 'Le prix est obligatoire'],
    },
    description: {
        type     : String,
        trim     : true,
    },
    marque: {
        type     : String,
        trim     : true,
        required : [true, 'La marque est obligatoire'],
    },
    etat: {
        type     : String,
        trim     : true,
        required : [true, 'L\'état est obligatoire'],
    },
    couleur: {
        type     : String,
        trim     : true,
    },
    poids: {
        type     : Number,
        trim     : true,
    },
    taille_ecran: {
        type     : String,
        trim     : true,
    },
    megapixels: {
        type     : String,
        trim     : true,
    },
    stockage: {
        type     : Number,
        trim     : true,
        required : [true, 'La taille de stockage est obligatoire'],
    },
    os: {
        type     : String,
        trim     : true,
    },
    sd: {
        type     : Boolean,
        trim     : true,
    },
    date_sortie: {
        type     : Date,
        trim     : true,
    },
    ram: {
        type     : Number,
        trim     : true,
        required : [true, 'La taille de la ram est obligatoire'],
    },
    double_sim: {
        type     : Boolean,
        trim     : true,
    },
    reseau: {
        type     : String,
        trim     : true,
    },
    id_price_sem: {
        type     : String,
        trim     : true,
    },
    id_price_mois: {
        type     : String,
        trim     : true,
    },
    id_price_an: {
        type     : String,
        trim     : true,
    },
}, {
    timestamps: true // ajoute 2 champs au document createdAt et updatedAt
});

module.exports = mongoose.model('Phone', Phone);