import { getRepository} from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

interface Request {
  email: string,
  password: string
}

interface Response {
  user: User;
  token: string;
}


class AuthenticateUserService{
  public async execute({ email, password}: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email: email } })

    if(!user){
      throw new Error('Incorrect email/password combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched){
      throw new Error('Incorrect email/password combination.');
    }

    const token = sign({}, "c79fd757abcd16c8f6ae0d3b9dc54a01", {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    }
  }
}            

export default AuthenticateUserService;

