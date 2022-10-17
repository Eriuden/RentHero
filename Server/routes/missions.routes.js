const router = require("express").Router()
const missionController = require("../controllers/missions.controller")
const multer = require("multer")
const upload = multer()

router.get("/", missionController.readMission)
router.put("/:id", missionController.updateMission)
router.delete("/:id", missionController.deleteMission)

router.patch("/accept-mission/:id", missionController.acceptMission)
router.patch("/abandon-mission/:id", missionController.abandonMission)

module.exports = router