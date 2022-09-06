const authorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel")


// ----------------------------------------------------- createBlogs -----------------------------------------------------

const createBlogs = async function (req, res) {
    try {
        const blog = req.body
        const authorId = req.body.authorId
        if (Object.keys(blog).length == 0) return res.status(400).send({ status: false, msg: "blog is manadatory" })
        if (!authorId) return res.status(400).send({ msg: "id is mandatory" })
        const id = await authorModel.findById(authorId)
        if (!id) return res.status(404).send({ status: false, msg: "no Author is present for this Id" })
        const blogData = await blogModel.create(blog)
        return res.status(201).send({ status: true, data: blogData })
    }
    catch (err) {
        return res.status(500).send({ msg: err.message })
    }
}


// -------------------------------------------------------- get Blogs -------------------------------------------------------- 

const getBlogs = async function (req, res) {
    try {
        const queries = req.query // it gives an object

        if (Object.keys(queries) == 0) {
            const result1 = await blogModel.find({ isDeleted: false, isPublished: true })//.count()
            if (result1.length == 0) return res.status(404).send({ status: false, msg: "no Data found" })
            return res.status(200).send({ status: true, data: result1 })
        }
        // ------------------------------------- this is for query param -------------------------------------
        else {
            const result2 = await blogModel.find(queries).find({ isDeleted: false, isPublished: true })//.count()
            if (result2.length == 0) return res.status(404).send({ status: false, msg: "no data " })
            return res.status(200).send({ status: true, data: result2 })
        }
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

// --------------------------------------- deleteBlogs by param -----------------------------------

const deleteBlogsByParam = async function (req, res) {
    try {
        const blogId = req.params.blogId
        const blog = await blogModel.findById(blogId).select({ isDeleted: 1, _id: 0 })

        if (!blog) return res.status(404).send({ status: false, msg: "no data found" })

        if (blog.isDeleted == true) return res.status(404).send({ status: false, msg: "blog already deleted" })

        await blogModel.findByIdAndUpdate(blogId, { isDeleted: true, deletedAt: Date.now() }, { new: true })

        return res.status(200).send({ status: true, msg: "blog deleted" })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

// --------------------------------------- deleteBlogs by Qyery -----------------------------------

let deleteBlogsByQuery = async function (req, res) {
    try {
        let query = req.query
        if (Object.keys(query) == 0) return res.status(400).send({ status: false, msg: "please apply filter" })

        let category = req.query.category
        let authorid = query.authorid
        let tag = query.tag
        let subcategory = query.subcategory
        let unpublished = query.unpublished

        const temp = {}
        if (category) { temp.category = category }
        if (authorid) { temp.authorId = authorid }
        if (tag) { temp.tags = tag }
        if (subcategory) { temp.subcategory = subcategory }
        if (unpublished) {
            if (unpublished == "false") {
                temp.isPublished = false
            } else { temp.isPublished = true }
        }
        const deleted = await blogModel.findOne(temp).select({ isDeleted: 1, _id: 0 })
        if (deleted.isDeleted == true) return res.status(404).send({ status: false, msg: "already deleted" })
        await blogModel.findOneAndUpdate(temp, { isDeleted: true, deletedAt: Date.now() }, { new: true })
        return res.status(200).send({ status: true })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.createBlogs = createBlogs
module.exports.getBlogs = getBlogs
module.exports.deleteBlogsByParam = deleteBlogsByParam
module.exports.deleteBlogsByQuery = deleteBlogsByQuery
