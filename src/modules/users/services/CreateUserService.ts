import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

/**
 * Class CreateUserService
 * method execute() find out users by email if it's a existent email.
 * then create it and save into DB.
 */
interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const emailsExists = await usersRepository.findByEmail(email);
    if (emailsExists) {
      throw new AppError('The email is already in use.');
    }
    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await usersRepository.save(user);

    return user;
  }
}
