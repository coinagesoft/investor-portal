import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    title: String,
    fileUrl: String,
    folderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Folder"
    }
});

export default mongoose.models.Files || mongoose.model("Files", fileSchema);
