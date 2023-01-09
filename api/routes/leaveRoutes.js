const express = require("express");
const {
    getLeaves,
    getLeave,
    applyLeave,
    manageApplicationStatus,
} = require("../controllers/leaveControllers");
const router = express.Router();

router.post("/apply", applyLeave);
router.post("/:id", manageApplicationStatus);
router.get("/", getLeaves);
router.get("/details/:id", getLeave);

module.exports = router;