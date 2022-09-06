const authorModel = require("../models/authorModel")

// ----------------------------------------------------- create Author -----------------------------------------------------


const createAuthor = async function (req, res) {
    try {
        const authorCredential = req.body
        if (Object.keys(authorCredential).length == 0) return res.status(400).send({ status: false, msg: "credentials are manadatory" })
        // if (!fname || !lname || !title || !email || !password) return res.status(400).send({ status: false, msg: "all credentials are manadatory" })
        const authorData = await authorModel.create(authorCredential)
        return res.status(201).send({ status: true, data: authorData })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.createAuthor = createAuthor
