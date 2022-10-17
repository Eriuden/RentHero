const userModel = require("../models/users.model")
const jwt=("jsonwebtoken")
const {signInErrors, signUpErrors} = require("../utils/errors.utils")

const maxAge = 3*24*60*60*1000

//Token de connection

const createToken = (id) => {
    return jwt/sign({id}, process.env.TOKEN_SECRET), {
        expiresIn: maxAge
    }
}

module.exports.signUp = async (req,res) => {
    const {name, email, password, role} = req.body

    try {
        const user = await userModel.create({ name, email,password, role})
        res.status(201).json({user:user_id})
    }

    catch(err){
        const errors = signUpErrors(err)
        res.status(200).send({errors})
    }
}

module.exports.signIn = async (req,res) => {
    const {name, password} = req.body

    try{
        const user = await userModel.login(name, password)
        const token = createToken(user._id)

        res.cookie("jwt", token, { httpOnly: true, maxAge})
        res.status(201).json({user: user._id})
    }
    catch(err){
        const errors = signInErrors(err)
        res.status(200).send({errors})
    }
}

//On invalide tout d'abor le cookie, mais aussi
//on rend quasi inexistante sa durée de vie
module.exports.logout = (req,res) => {
    res.cookie("jwt","", {maxAge: 1})
    res.redirect("/")
}



