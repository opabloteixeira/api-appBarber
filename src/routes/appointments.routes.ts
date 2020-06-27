import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
// DTO - Data Transfer Object
// Rota, Receber requisição, chamar outro arquivo, devolver uma resposta
// SoC

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentRepository.find();

  return response.json(appointments);
})



appointmentsRouter.post('/', async (request, response) => {

    const { provider_id, date } = request.body;

    const parseDate = parseISO(date);
    
    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({date: parseDate, provider_id})

    return response.json(appointment);

 

});


export default appointmentsRouter;
