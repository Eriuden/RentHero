// On a besoin d'une desc, d'un nombre de héros,
// de la prime et de la géolocalisation
//Et du tableau des héros ayant répondu présent (likes)

const mongoose = require("mongoose")

const MissionSchema = new mongoose.Schema({

    posterId: {
        type:String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    numberOfHero: {
        type: Number,
        required: true,
    },
    wage: {
        type: String,
        required: true,
    },
    geolocalisation: {
        type: String,
        required: true,
    },
    missionAcceptedBy: {
        type: [String],
        required: true
    }
})

const missionsModel = mongoose.model("mission", MissionSchema)
module.exports = missionsModel