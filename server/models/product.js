const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true,
        maxlength:32,
        text:true,
        trim:true,
    },
    slug: {
        type:String,
        unique:true,
        lowercase:true,
        index:true,
    },
    description: {
        type: String,
        required:true,
        maxlength:2000,
        text:true
    },
    price: {
        type: Number,
        required:true,
        trim:true,
        maxlength:32
    },
    category: {
        type: ObjectId,
        ref:'Category',
        required:true
    },
    subs: [
        {
            type:ObjectId,
            ref:'Sub',
            required:true
        },
    ],
    quantity: Number,
    sold: {
        type:Number,
        default:0
    },
    images: {
        type:Array
    },
    shipping: {
        type: String,
        enum: ['Yes', 'No']
    },
    color: {
        type: String,
        enum: ['Green', 'Blue', 'Black', 'Brown', 'Red', 'white', 'purple', 'yellow'],
    },
    brand: {
        type: String,
        enum: ['Clothes', 'Earphones', 'Laptop', 'Mobile', 'TV', 'Watch']
    },
    // ratings: [
    //     {
    //         type:Number,
    //         postedBy: {type:ObjectId, ref:'User'}
    //     }
    // ]
},
{timestamps:true}
);

module.exports = mongoose.model('Product', productSchema);