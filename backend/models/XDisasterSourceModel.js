const mongoose = require("mongoose");

const XHandleSchema = new mongoose.Schema(
    {
        handle: {
            type: String,
            required: [true, "A X handle must have a name"],
            unique: true,
            trim: true,
        },
    },
    {
        toJSON: { virtuals: true },
    },
    {
        toObject: { virtuals: true },
    }
);

XHandleSchema.virtual("posts", {
    ref: "XPost",
    foreignField: "xhandle",
    localField: "_id"
})

const XHandle = mongoose.model("XHandle", XHandleSchema);

module.exports = XHandle;
