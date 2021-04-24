import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { compare, hash } from 'bcryptjs';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password: string;
  old_password: string;
}

export default class UpdateProfileService {
  private usersRepository: UsersRepository;
  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest) {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found..');
    }

    const userUpdateEmail = await this.usersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== user.id) {
      throw new AppError('There is already one user with this email.');
    }

    if (password && !old_password) {
      throw new AppError('Old Password is required.');
    }

    if (old_password === password) {
      const checkOldPassword = await compare(old_password, password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match..');
      }
      user.password = await hash(password, 8);
    }
    user.name = name;
    user.email = email;

    await this.usersRepository.save(user);

    return user;
  }
}
