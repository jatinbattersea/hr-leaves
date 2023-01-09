const asyncHandler = require("express-async-handler");
const { Leave } = require("../models/LeaveModel");
const Employee = require("../models/employeeModel");

// apply leave
const applyLeave = asyncHandler(async (req, res, next) => {
    const { name, email, leaveType, reason, lastUpdated, from, to, totalDays, status, msg } = req.body;

    if (!name || !email || !leaveType || !reason || !from || !to || !totalDays || !status) {
        res.status(400);
        throw new Error("Please Enter all the Feilds !");
    }	

    const leave = await Leave.create({
        name,
        email,
        leaveType,
        reason,
        lastUpdated,
        from,
        to,
        totalDays,
        status,
        msg
    });

    if (leave) {
        res.status(201).json("Leave Applied successfully !");
    } else {
        res.status(400);
        throw new Error("Something went wrong !");
    }
});

// manage application status
const manageApplicationStatus = asyncHandler(async (req, res) => {
    try {
        // await Leave.findByIdAndUpdate(req.params.id, {
        //     lastUpdated: req.body.lastUpdated,
        //     status: req.body.status,
        //     msg: req.body.msg,
        // });

        if (req.body.status === "Approved") {
            const d = new Date();
            let month = d.getMonth();

            const employee = await Employee.findOne({ email: req.body.email });

            let keys = {
                cl: employee.offs[month].cl,
                leavesTaken: employee.offs[month].leavesTaken,
                leaves: employee.offs[month].leaves,
            };

            if (req.body.totalDays > keys.cl && keys.cl > 0) {
                if ((req.body.totalDays - keys.cl) === 0) {
                    var cl = 0;
                    var leavesTaken = 0;
                } else {
                    var cl = 0;
                    var leavesTaken = (keys.leavesTaken + req.body.totalDays);
                }
                for (var leavesArray = keys.leaves, dt = new Date(req.body.from); dt <= new Date(req.body.to); dt.setDate(dt.getDate() + 1)) {
                    leavesArray.push(new Date(dt));
                }
                
                const off = {
                    cl,
                    leavesTaken,
                    leaves: leavesArray,
                }

                const s = await Employee.updateOne({ email: req.body.email }, {
                    $set: {
                        "offs.0": off,
                    }
                });

                console.log(s);
            //     // await Employee.updateOne({ email: req.body.email }, { $push: { $each: { leaves: leavesArray } } });
            }
            // else {
            //     if ((employee.key.cl - req.body.totalDays) === 0) {
            //         var cl = 0;
            //         var leavesTaken = 0;
            //     } else {
            //         var cl = (employee.key.cl - req.body.totalDays);
            //         var leavesTaken = 0;
            //     }
            //     for (var leavesArray = employee.key.leaves, dt = new Date(from); dt <= new Date(to); dt.setDate(dt.getDate() + 1)) {
            //         leavesArray.push(new Date(dt));
            //     }
            //     await Employee.updateOne({ email: req.body.email }, {
            //         $set: {
            //             [keys.cl]: cl,
            //             [keys.leavesTaken]: leavesTaken,
            //             [keys.leaves]: leavesArray,
            //         }
            //     });

            // //     // await Employee.updateOne({ email: req.body.email }, { $push: { leaves: req.body.to } });
            // }
        }

        res.status(200).json(`Leave has been ${req.body.status}`);
    } catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }
});

// Get Leaves
const getLeaves = asyncHandler(async (req, res) => {
    try {
        const leaves = await Leave.find({});

        res.status(200).json(leaves);
    } catch (err) {
        return res.status(500).json(err);
    }

});

// Get Leaves
const getLeave = asyncHandler(async (req, res) => {
    try {
        const leave = await Leave.findById(req.params.id);

        res.status(200).json(leave);
    } catch (err) {
        return res.status(500).json(err);
    }

});

module.exports = { applyLeave, manageApplicationStatus, getLeaves, getLeave };