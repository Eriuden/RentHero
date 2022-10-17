const userModel = require("../models/users.model")

const ObjectId = require("mongoose").Types.ObjectId

module.exports.getAllUsers = async (req,res) => {
    const users = await userModel.find().select("-password")
    res.status(200).json(users)
}

module.exports.userInfo = (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown :" + req.params.id)
    
    userModel.findById(req.params.id, (err,docs) => {
        if (!err) res.send(docs)
        else console.log("id unknown" + err)
    }).select("-password")
    }

    module.exports.updateUser = async (req,res) => {
        if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("Id unknown : " + req.params.id)
        try{
            await userModel.findOneAndUpdate(
                {_id: req.params.id},
                {
                    $set: {
                        bio: req.body.bio,
                        name: req.body.name,
                        abilities: req.body.abilities
                    },
                },
                {new: true, upsert: true, setDefaultOnInsert: true},
                (err,docs) => {
                    if (!err) return res.send(docs)
                    if (err) return res.status(500).send({message: err})
                }
            )
        } catch(err) {
            return res.status(500).json({message: err})
        }
    }

    module.exports.deleteUser = async (req,res) => {
        if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("Id unknown" + req.params.id)
        try{
            await userModel.remove({ _id: req.params.id }).exec()
            res.status(200).json({ message: "au revoir"})
        } catch (err) {
            return res.status(500).json({ message: err })
        }
    }