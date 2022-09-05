const blogModel = require("../models/blogModel")

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

module.exports.createBlogs = createBlogs
