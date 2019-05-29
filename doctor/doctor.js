const { mongoose } = require("../db/db");
const { userSchema } = require("../db/shared_schemas/");

const doctorSchema = new mongoose.Schema(userSchema);

doctorSchema.add({
    isAdmin: {
        type: Boolean,
        default: false
    },
    DOJ: Date,
    qualifications: [
        {
            type: String
        }
    ],
    specialisations: [
        {
            type: String
        }
    ],
    designation: { type: String, required: true },
    department: { type: String },
    visitingTime: [{ branch: String, timings: Date }]
});

doctorSchema.statics.getIsDoctorAdminByEmail = async function (email) {
    let doctor = await this.findOne({ "contacts.email": email }, 'isAdmin');

    if (doctor.isAdmin) {
        console.log(doctor);
    }
};

doctorSchema.statics.getDoctors = async function () {
    // remove _id, _v and password properties from resultset
    const doctorResultFilter = '-_id -__v -password';

    let doctors = await this.find({}, doctorResultFilter);

    return {
        success: true,
        statusCode: 200,
        statusText: "OK",
        total: doctors.length,
        data: doctors
    };
}

doctorSchema.statics.getDoctorByEmail = async function (email) {
    // remove _id and _v properties from resultset
    const clientResultFilter = '-_id -__v';

    let doctor = await this.findOne({ "contacts.email": email }, clientResultFilter);

    console.log(doctor);
}

doctorSchema.statics.createDoctor = async function (newDoctor) {
    try {
        // if doctor exists then do not insert and, prompt user with message
        let { email } = newDoctor.contacts;

        let doctorExists = await this.findOne({ "contacts.email": email });

        if (doctorExists && (doctorExists.contacts.email === email)) {
            return {
                success: false,
                statusCode: 409,
                statusText: "Conflict",
                message: `doctor with email ${email} already exists!`
            };
        }

        let doctor = await this.create(newDoctor)

        if (doctor && doctor.contacts.email === email) {
            return {
                success: true,
                statusCode: 200,
                statusText: "OK",
                message: `doctor inserted`,
                data: doctor
            };
        } else {
            throw new Error();
        }
    } catch (err) {
        return {
            success: false,
            statusCode: 500,
            statusText: "Internal Server Error",
            message: err.message
        };
    }
};

doctorSchema.statics.updateDoctorByEmail = async function (doctor) { };

doctorSchema.statics.deleteDoctorByEmail = async function (email) { };

exports.Doctor = mongoose.model("Doctor", doctorSchema);
