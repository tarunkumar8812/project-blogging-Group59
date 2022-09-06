const express = require('express');
const router = express.Router();
const authorController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")



router.post("/authors", authorController.createAuthor) // to create authors

router.post("/blogs", blogController.createBlogs) // to create blogs

router.get("/blogs", blogController.getBlogs) // to finding blogs

router.delete("/blogs/:blogId", blogController.deleteBlogsByParam) // to deleting blogs by param

router.delete("/blogs", blogController.deleteBlogsByQuery) // to deleting blogs by query

router.put("/blogs/:blogId",blogController.updateBlog)

router.delete("/blogs/:blogId",blogController.deleteBlogsByParam)

router.delete("/blogs",blogController.deleteBlogsByParam)

module.exports = router;