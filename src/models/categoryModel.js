import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name :{
        type : String,
        trim:true,
        require: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
      },
      parentId: {
        type: String,
      },
      // createdBy: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "User",
      //   required: true,
      // },
}, {
    timestamps: true
});

const Category = mongoose.model("Category", categorySchema)
export default Category;