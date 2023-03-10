const mongoose = require("mongoose");
const { ShiftSchema } = require("./shiftModel");
const { TeamSchema } = require("./teamModel");

const employeeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: [true, 'That email is taken.'],
            lowercase: true,
        },
        phone: {
            type: String,
            unique: true,
            required: true,
            unique: [true, 'That phone number already is taken.'],
        },
        employeeID: {
            type: String,
            required: true,
            unique: [true, 'That employee id already is taken.'],
        },
        dob: {
            type: String,
            required: true,
        },
        doj: {
            type: String,
            required: true,
        },
        profileImage: {
            type: String,
        },
        designation: {
            id: {
                type: String,
                required: true,
            },name: {
                type: String,
                required: true,
            }
        },
        team: {
            type: TeamSchema,
            required: true,
        },
        address: {
            type: String,
            required: true,
            max: 70,
        },
        bankName: {
            type: String,
        },
        accNo: {
            type: String,
        },
        ifsc: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        shift: {
            type: ShiftSchema,
            required: true,
        },
        offs: {
            0: {
                cl: {
                    type: Number,
                    default: 1
                },
                leavesTaken: {
                    type: Number,
                    default: 0
                },
                leaves: {
                    type: Array,
                    default: [],
                }
            },
            1: {
                cl: {
                    type: Number,
                    default: 1
                },
                leavesTaken: {
                    type: Number,
                    default: 0
                },
                leaves: {
                    type: Array,
                    default: [],
                }
            },
            2: {
                cl: {
                    type: Number,
                    default: 1
                },
                leavesTaken: {
                    type: Number,
                    default: 0
                },
                leaves: {
                    type: Array,
                    default: [],
                }
            },
            3: {
                cl: {
                    type: Number,
                    default: 1
                },
                leavesTaken: {
                    type: Number,
                    default: 0
                },
                leaves: {
                    type: Array,
                    default: [],
                }
            },
            4: {
                cl: {
                    type: Number,
                    default: 1
                },
                leavesTaken: {
                    type: Number,
                    default: 0
                },
                leaves: {
                    type: Array,
                    default: [],
                }
            },
            5: {
                cl: {
                    type: Number,
                    default: 1
                },
                leavesTaken: {
                    type: Number,
                    default: 0
                },
                leaves: {
                    type: Array,
                    default: [],
                }
            },
            6: {
                cl: {
                    type: Number,
                    default: 1
                },
                leavesTaken: {
                    type: Number,
                    default: 0
                },
                leaves: {
                    type: Array,
                    default: [],
                }
            },
            7: {
                cl: {
                    type: Number,
                    default: 1
                },
                leavesTaken: {
                    type: Number,
                    default: 0
                },
                leaves: {
                    type: Array,
                    default: [],
                }
            },
            8: {
                cl: {
                    type: Number,
                    default: 1
                },
                leavesTaken: {
                    type: Number,
                    default: 0
                },
                leaves: {
                    type: Array,
                    default: [],
                }
            },
            9: {
                cl: {
                    type: Number,
                    default: 1
                },
                leavesTaken: {
                    type: Number,
                    default: 0
                },
                leaves: {
                    type: Array,
                    default: [],
                }
            },
            10: {
                cl: {
                    type: Number,
                    default: 1
                },
                leavesTaken: {
                    type: Number,
                    default: 0
                },
                leaves: {
                    type: Array,
                    default: [],
                }
            },
            11: {
                cl: {
                    type: Number,
                    default: 1
                },
                leavesTaken: {
                    type: Number,
                    default: 0
                },
                leaves: {
                    type: Array,
                    default: [],
                }
            },
        },
    },
    {
        timeStamps: true,
    },
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;


// Leaves format

// offs: {
//     0: {
//         cl: 1,
//         leaves: [],
//     }
//     ...
// }