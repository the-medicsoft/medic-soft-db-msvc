const { mongoose } = require('../db/db');

const AppointmentSchema = new mongoose.Schema({
  department: { type: String, required: true },
  creationDate: { type: Date, default: new Date() },
  appointmentDate: Date,
  // TODO: Separate Appointment Status
  appointmentStatus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AppointmentStatus',
    default: 'P'
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor'
  }
});

AppointmentSchema.statics.createAppointment = async function(appointment) {
  try {
    let result = await this.create(appointment);

    if (result) {
      return {
        success: true,
        message: 'appointment created',
        appointment: result
      };
    }
  } catch (e) {
    return {
      success: false,
      message: 'appointment not created',
      err: e.message
    };
  }
};

AppointmentSchema.statics.getAppointments = async function() {
  try {
    let result = await this.find({}, '-_id -__v')
      .populate({
        path: 'client',
        select: 'address contacts firstName lastName -_id'
      })
      .populate({
        path: 'doctor',
        select:
          'address contacts qualifications specialisations department firstName lastName designation -_id'
      })
      .populate({
        path: 'appointmentStatus',
        select: '-_id'
      });

    if (result.length > 0) {
      return {
        success: true,
        total: result.length,
        data: result
      };
    } else {
      return {
        success: true,
        total: result.length,
        message: 'no appointments found!'
      };
    }
  } catch (e) {
    return {
      success: false,
      message: 'failed to get all appointment',
      err: e.message
    };
  }
};

exports.Appointment = mongoose.model('Appointment', AppointmentSchema);
