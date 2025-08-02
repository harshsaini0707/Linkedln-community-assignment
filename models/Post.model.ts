import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
