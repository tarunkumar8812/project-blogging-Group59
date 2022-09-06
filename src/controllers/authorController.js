const authorModel = require("../models/authorModel")

<<<<<<< HEAD
// ----------------------------------------------------- create Author -----------------------------------------------------
=======
const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) { return false }
    if (typeof value === 'string' && value.trim().length === 0) { return false }
    return true;
}

const isValidAuthorCredentials = function (authorCredential) {
>>>>>>> cd6da7588d01179d4b0a6b2b75b9a9f4270246af

    //checks if all the required object keys of schema are present or not

    return Object.keys(authorCredential).length > 0
}

const createAuthor = async function (req, res) {
    try {
<<<<<<< HEAD
        const authorCredential = req.body
        if (Object.keys(authorCredential).length == 0) return res.status(400).send({ status: false, msg: "credentials are manadatory" })
        // if (!fname || !lname || !title || !email || !password) return res.status(400).send({ status: false, msg: "all credentials are manadatory" })
        const authorData = await authorModel.create(authorCredential)
        return res.status(201).send({ status: true, data: authorData })
=======
        let authorCredential = req.body

        if (!isValidAuthorCredentials(authorCredential)) {
            return res.status(400).send({ status: false, msg: "one or more request Body parameters are missing of author details" })
        }

        if (!isValid(authorCredential.fname)) {
            return res.status(400).send({ status: false, msg: "First name required" })
        }

        if (!isValid(authorCredential.lname)) {
            return res.status(400).send({ status: false, msg: "Last name required" })
        }

        if (!isValid(authorCredential.title)) {
            return res.status(400).send({ status: false, msg: "Title required" })
        }
        

        if (!isValid(authorCredential.email)) {
            return res.status(400).send({ status: false, msg: "Email is required" })
        }

        if (!isValid(authorCredential.password)) {
            return res.status(400).send({ status: false, msg: "Password is required" })
        }

        let isEmailAlreadyPresent = await authorModel.findOne({ email: authorCredential.email })

        if (isEmailAlreadyPresent) {
            return res.status(400).send({ status: false, msg: authorCredential.email + " " + "is already present" })
        }

        let authorData = await authorModel.create(authorCredential)
        return res.status(201).send({ status: true, msg: "Author created successfully", data: authorData })
>>>>>>> cd6da7588d01179d4b0a6b2b75b9a9f4270246af
    }


    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }



}


module.exports.createAuthor = createAuthor


/*"status": true,
    "msg": "Author created successfully",
    "data": {
        "fname": "Amit",
        "lname": "Agarwal",
        "title": "Mr",
        "email": "amitagarwal@gmail.com",
        "password": "amit@2022",
        "_id": "631654261b588ebf167de9c7",
        "createdAt": "2022-09-05T19:55:18.833Z",
        "updatedAt": "2022-09-05T19:55:18.833Z",
        "__v": 0
        
    "status": true,
    "msg": "Author created successfully",
    "data": {
        "fname": "Deepak",
        "lname": "Kanakaraju",
        "title": "Mr",
        "email": "dk@gmail.com",
        "password": "deepak@2022",
        "_id": "631654a31b588ebf167de9cb",
        "createdAt": "2022-09-05T19:57:23.082Z",
        "updatedAt": "2022-09-05T19:57:23.082Z",
        "__v": 0
    
        
        
        */