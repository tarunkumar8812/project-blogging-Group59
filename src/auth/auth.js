// const jwt = require("jsonwebtoken")

// const authenticate = function (req, res, next) {
//     //check the token in request header
//     //validate this token
//     let token = req.headers["x-auth-token"];
//     console.log(token);
//     // if (!token) token = req.headers["x-auth-token"];
//     if (!token) return res.send({ status: false, msg: "token must be present" });

//     let decodedToken = jwt.verify(token, "functionup-plutonium-Tarun's-very-very-secret-key");
//     if (!decodedToken) return res.send({ status: false, msg: "token is invalid" });
//     req.decodedToken = decodedToken

//     next()
// }

// module.exports.authenticate = authenticate




// let token = jwt.sign(
//     {
//       userId: user._id.toString(),
//       batch: "plutonium",
//       organisation: "FunctionUp",
//     },
//     "functionup-plutonium-Tarun's-very-very-secret-key"//"functionup-plutonium"
//   );
//   res.setHeader("x-auth-token", token);