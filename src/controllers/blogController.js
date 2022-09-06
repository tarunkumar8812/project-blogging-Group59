const mongoose = require("mongoose");
const blogModel = require("../models/blogModel")

// const isValidObjectId = function (objectId) {
//     return mongoose.Schema.Types.ObjectId.isValid(objectId)
// }

const isStringType = function (value) {
    if (typeof value === 'string' && value.trim().length === 0) { return false }
    return true
}


const createBlogs = async function (req, res) {
    try {
        const blog = req.body
        if (!blog) return res.status(400).send({ status: false, msg: "blog is manadatory" })
        const blogData = await blogModel.create(blog)
        return res.status(201).send({ status: true, data: blogData })
    }
    catch (err) {
        return res.status(500).send({ msg: err.message })
    }
}


//API to update blog by blog id
const updateBlog = async function (req, res) {
    try {
        let blogId = req.params.blogId;
        let requestBody = req.body;
        const { title, body, tags, subcategory } = requestBody

        // if (!(mongoose.Schema.Types.ObjectId.isValid(blogId))) {
        //     return res.status(400).send({ status: false, msg: "Blog id is incorrect" })
        // }

        if (!isStringType(title)) {
            return res.status(400).send({ status: false, msg: "Title is required" })
        }
        if (!isStringType(body)) {
            return res.status(400).send({ status: false, msg: "Body is required" })
        }
        if (tags) {
            if (tags.length === 0) {
                return res.status(400).send({ status: false, msg: "Tag is required" })
            }
        }

        if (subcategory) {
            if (subcategory.length === 0) {
                return res.status(400).send({ status: false, msg: "subcategory is required" })
            }
        }

        let blog = await blogModel.find({ _id: blogId });
        if (!blog) {
            return res.status(400).send({ status: false, msg: "No such blog present in DB" })
        }

        if (req.body.title || req.body.body || req.body.tags || req.body.subcategory) {
            const title = req.body.title;
            const body = req.body.body;
            const tags = req.body.tags;
            const subcategory = req.body.subcategory
            const isPublished = req.body.isPublished

            const updatedBlog = await blogModel.findOneAndUpdate({ _id: blogId }, { title: title, body: body, $addToSet: { tags: tags, subcategory: subcategory }, isPublished: isPublished }, { new: true });
            if (updatedBlog.isPublished == true) {
                updatedBlog.publishedAt = new Date();
            }
            if (updatedBlog.isPublished == false) {
                updatedBlog.publishedAt = null;
            }
            res.status(200).send({
                status: true,
                message: "Successfully updated blog details",
                data: updatedBlog,
            })
        } else {
            return res.status(400).send({ status: false, msg: "Please provide blog details to update" });
        }
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }

};


module.exports.createBlogs = createBlogs
module.exports.updateBlog = updateBlog
