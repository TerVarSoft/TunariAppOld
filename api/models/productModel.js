var mongoose = require('mongoose');
    Schema = mongoose.Schema;

var productModel = Schema({
    name : {
        type: String
    },
    productType : {
        type: String
    },
    genre : {
        type: String
    },
    colour : {
        type: String
    },
    size:{
        type:String
    },
    tags : {
        type: [String]
    },
    imageUrl : {
        type: String
    },    
    quantity:{
        type: Number
    },
    normalSellingPricePerUnit:{
        type: Number
    },
    normalSellingPricePerPackage:{
        type: Number
    },
    buyingPricePerUnit:{
        type: Number
    },
    buyingPricePerPackage:{
        type: Number
    },
    specialSellingPricePerUnit:{
        type: Number
    },
    specialSellingPricePerPackage:{
        type: Number
    },
    warehouse:{
        type: String
    },
    shelf:{
        type: String
    },
    Location:{
        type: String
    }
    
});


module.exports = mongoose.model('Product', productModel)