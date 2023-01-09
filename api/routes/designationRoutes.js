const express = require("express");
const {
    getDesignations,
    getDesignation,
    addDesignation,
    updateDesignation,
    deleteDesignation,
} = require("../controllers/designationControllers");
const router = express.Router();

router.get("/", getDesignations);
router.get("/:name", getDesignation);
router.post("/addDesignation", addDesignation);
router.put("/:id", updateDesignation);
router.delete("/:id", deleteDesignation);

module.exports = router;