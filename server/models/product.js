const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
      text: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subs: [
      {
        type: ObjectId,
        ref: "Sub",
      },
    ],
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
    },
    language: {
      type: String,
      enum: [
        "Hindi",
        "English",
        "Kannada",
        "Telugu",
        "Tamil",
        "Malayalam",
        "Marathi",
        "Gujarati",
        "Punjabi",
      ],
    },
    // brand: {
    //     type: String,
    //     enum: ['Clothes', 'Earphones', 'Laptop', 'Mobile', 'TV', 'Watch']
    // },
    ratings: [
      {
        star: Number,
        postedBy: { type: ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
