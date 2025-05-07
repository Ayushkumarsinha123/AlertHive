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

XPostSchema.virtual('casualties').get(function () {
    // Generates random numbers between 0–10
    const injuries = Math.floor(Math.random() * 11);
    const death = Math.floor(Math.random() * 6);
    return { injuries, death };
});

const XPost = mongoose.model("XPost", XPostSchema);

module.exports = XPost;
