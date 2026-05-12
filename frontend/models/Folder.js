import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
    name: String,
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }
});

export default mongoose.models.Folder || mongoose.model("Folder", folderSchema);
