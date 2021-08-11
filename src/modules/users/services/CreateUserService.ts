import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
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
  private usersRepository: UsersRepository;
  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async execute({ name, email, password }: IRequest) {
    const emailsExists = await this.usersRepository.findByEmail(email);
    if (emailsExists) {
      throw new AppError('The email is already in use.');
    }
    const hashedPassword = await hash(password, 8);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await this.usersRepository.save(user);

    return user;
  }
}
