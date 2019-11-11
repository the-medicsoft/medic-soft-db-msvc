const { db, BaseModel } = require('../db');

const { Schema, model } = db.mongoose;

const AppointmentSchema = new Schema({
  creationDate: {
    type: Date,
    default: new Date()
  },
  appointmentDate: {
    type: Date
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  appointmentStatusCode: {
    type: Schema.Types.ObjectId,
    ref: 'AppointmentStatus',
    required: true
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  }
});

class Appointment extends BaseModel {
  constructor() {
    super(model('Appointment', AppointmentSchema));
  }

  async createAppointment({ appointment }) {
    let result = await super.create({ body: appointment });

    if (result) {
      return super.success({ data: result });
    } else {
      super.fail({ message: 'appointment not created' });
    }
  }

  async getAppointments() {
    let appointments = await super.read();

    await this.Model.populate(appointments, {
      path: 'department'
    });

    await this.Model.populate(appointments, {
      path: 'client'
    });

    await this.Model.populate(appointments, {
      path: 'doctor'
    });

    await this.Model.populate(appointments, {
      path: 'appointmentStatusCode'
    });

    if (appointments.length) {
      return super.success({ total: appointments.length, data: appointments });
    } else if (appointments.length === 0) {
      super.notFound({ message: 'No Appointments Found!' });
    } else {
      super.fail({ message: 'failed to get all appointment' });
    }
  }
}

exports.Appointment = Appointment;
