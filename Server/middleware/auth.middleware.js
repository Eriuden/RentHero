const jwt = require("jsonwebtoken")
const userModel = require("../models/users.model")

module.exports.checkUser = (req,res,next) => {
    const token = req.cookies.jwt
    if(token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decocedToken) => {
            /* Si token mais erreur*/if (err) {
                res.locals.user = null
                res.cookie("jwt", "", {maxAge: 1})
                next()
            } /* Si tout est bon*/else {
                let user = await userModel.findById(decocedToken)
                res.locals.user = user
            }
        })
    } /*Si y'a même pas de token*/else {
        res.locals.user = null
        next()
    }
}

//cette fonction là servira plutôt de notre côté pour avoir les infos
module.exports.requireAuth = (req,res,next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decocedToken) => {
            if (err) {
                console.log(err)
            } else {
                console.log(decocedToken.id)
                next()
            }
        })
    } else {
        console.log("pas de token")
    }
}
