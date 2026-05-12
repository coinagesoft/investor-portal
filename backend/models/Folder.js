const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({

    name: String,

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }

});

module.exports = mongoose.model("Folder", folderSchema);