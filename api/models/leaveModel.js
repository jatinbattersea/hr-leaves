const mongoose = require("mongoose");

const LeaveSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        leaveType: {
            type: String,
        },
        reason: {
            type: String,
        },
        lastUpdated: {
            type: String,
        },
        from: {
            type: String,
        },
        to: {
            type: String,
        },
        totalDays: {
            type: String,
        },
        status: {
            type: String,
        },
        msg: {
            type: String,
        },
    },
    {
        timeStamps: true,
    }
);

const Leave = mongoose.model("Leave", LeaveSchema);

module.exports = { Leave };