const express = require("express");
const {
    getTeams,
    getTeam,
    addTeam,
    updateTeam,
    deleteTeam,
} = require("../controllers/teamControllers");
const router = express.Router();

router.get("/", getTeams);
router.get("/:name", getTeam);
router.post("/addTeam", addTeam);
router.put("/:id", updateTeam);
router.delete("/:id", deleteTeam);

module.exports = router;