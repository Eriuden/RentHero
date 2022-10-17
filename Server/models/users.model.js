/*
Il nous faut:
Un nom, un mail, un mdp, un role, un bio, les abilités
Pour les donneurs de missions,
il faudra l'historique des missions proposés
et pour les héros, celui des missions effectués ET en cours*/

const mongoose = require("mongoose")
const { isEmail } = require("validator")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            required: true,
        },
        picture: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            max: 1024,
            minLength: 6,
        },
        bio: {
            type: String,
            max:1024,
        },
        abilities: {
            type: String,
        },
        missionAccepted: {
            type: [String],
            required: true
        },
    },
    { timestamps: true, }
)

userSchema.pre("save", async function( next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.static.login = async function (name, password) {
    const user = await this.findOne({ name })
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user
        }
        throw Error("mot de passe incorrect")
    }
    throw Error("adresse mail incorrect")
}

const userModel = mongoose.model("user", userSchema)
module.exports = userModel