import { getRepository} from 'typeorm';
import { compare } from 'bcryptjs';

import User from '../models/User';
import { response } from 'express';


interface Request {
  email: string,
  password: string
}

interface Response {
  user: User
}


class AuthenticateUserService{
  public async execute({ email, password}: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email: email } })

    if(!user){
      throw new Error('Incorrect email/password combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if(!password){
      throw new Error('Incorrect email/password combination.');
    }

    return {
      user
    }
  }
}            

export default AuthenticateUserService;

