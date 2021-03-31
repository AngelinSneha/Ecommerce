const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;

const categorySchema = new mongoose.Schema({
    name: {
        type:String,
        trim:true,
        //to remove white spaces
        required:'Name is required',
        minlength:[1, 'Too short'],
        maxlength:[100, 'Too long']
    },
    slug: {
        type:String,
        unique:true,
        lowercase:true,
        index:true
    }
}, {timestamps:true}
);

module.exports = mongoose.model("Category", categorySchema);