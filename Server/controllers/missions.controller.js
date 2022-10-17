const missionsModel = require("../models/missions.model")
const usersModel = require("../models/users.model")

const ObjectId = require("mongoose").Types.ObjectId
const fs=require("fs")
const {promisify} = require("util")
const pipeline = promisify(require("stream").pipeline)

module.exports.readMission = (req,res) => {
    missionsModel.find((err,docs) => {
        if(!err)res.send(docs)
        else console.log("Error to get data" + err)
    }).sort({createdAt: -1})
}

module.exports.createMission = async (req,res) =>{
    
    const newMission = new missionsModel({
        description: req.body.description,
        numberOfHero: req.body.numberOfHero,
        wage: req.body.wage,
        geolocalisation: req.body.geolocalisation
    })

    try{
        const missionProfile = await newMission.save()
        return res.status(201).json(missionProfile)
    } catch(err) {
        return res.status(400).send(err)
    }

    
}

module.exports.updateMission = (req,res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("Id unknown" + err)

    const updated = {
        description: req.body.description,
        numberOfHero: res.body.numberOfHero,
        wage: req.body.wage,
        geolocalisation: req.body.geolocalisation
    }

    missionsModel.findByIdAndUpdate(
        req.params.id,
        { $set: updated},
        { new:true},
        (err,docs) => {
            if(!err) res.send(docs)
            else console.log("update errors:" + err)
        }
    )
}

module.exports.deleteMission = (req,res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("Id unknown :" + req.params.id)
    
    missionsModel.findByIdAndRemove(req.params.id, (err,docs) => {
        if (!err) res.send(docs).json({message: "La mission est abrogé ou accomplie"})
        else console.log("delete errors" + err)
    })
}

module.exports.acceptMission = async(req,res) =>{
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id)

    try {
        await missionsModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { missionAcceptedBy: req.body.id}
            },
            { new: true},
            (err,docs) => {
                if (err) return res.status(400).send(err)
            }
        )
        await usersModel.findByIdAndUpdate(
            req.body.id,
            {
               $addToSet: { acceptedMissions: req.params.id}, 
            },
            { new: true},
            (err,docs) => {
                if(!err) res.send(docs)
                return res.status(400).send(err)
            }
        )
    } catch(err) {
        return res.status(400).send(err)
    }
}

module.exports.abandonMission = async (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown :" + req.params.id)

    try{
        await missionsModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { missionAcceptedBy: req.body.id},
            },
            { new: true},
            (err, docs) => {
                if (err) return res.status(400).send(err)
            }
        )
        await usersModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { acceptedMissions: req.params.id},
            },
            { new: true},
            (err,docs) => {
                if (!err) res.send(docs)
                return res.status(400).send(err)
            }
        )
    } catch {
        return res.status(400).send(err)
    }
}

