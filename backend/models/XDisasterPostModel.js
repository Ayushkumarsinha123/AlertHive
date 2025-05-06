const mongoose = require("mongoose");

const XPostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            default: null
        },
        content: {
            type: String,
            trim: true,
            default: null
        },
        link: {
            type: String,
            required: [true, "An article must have a link"],
        },
        time: Date,
        fetchedAt: { type: Date, default: Date.now() },
        xhandle: {
            type: mongoose.Schema.ObjectId,
            ref: "XHandle",
            required: [true, "An article must belong to a handle"]
        }
    },
    {
        toJSON: { virtuals: true },
    },
    {
        toObject: { virtuals: true },
    }
);

XPostSchema.pre(/^find/, function (next) {
    this.populate({ path: "xhandle" })
    next()
})

const XPost = mongoose.model("XPost", XPostSchema);

module.exports = XPost;
