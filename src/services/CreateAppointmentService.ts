import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';
/*Dependency Inversion um conceito do (SOLID)*/

interface RequestDTO {
  date: Date,
  provider_id: string
}

class CreateAppointmentServices {

  public async execute({date, provider_id}: RequestDTO ): Promise<Appointment>{

    console.log('Data: ', date);
    const appointmentRepository = getCustomRepository(AppointmentRepository);
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentRepository.findByDate(appointmentDate);

    if(findAppointmentInSameDate){
      throw new AppError('This appointment is already booked');
    }

    const appointment = appointmentRepository.create({
      date: appointmentDate,
      provider_id
    });

    await appointmentRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentServices;
