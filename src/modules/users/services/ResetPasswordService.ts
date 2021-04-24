/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import AppError from '@shared/errors/AppError';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
  token: string;
  password: string;
}
/**
 * Class ResetPasswordService
 *
 */
export default class ResetPasswordService {
  private usersRepository: UsersRepository;
  private userTokensRepository: UserTokensRepository;
  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
    this.userTokensRepository = getCustomRepository(UserTokensRepository);
  }
  public async execute({ token, password }: IRequest) {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does not exists.');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.');
    }
    user.password = await hash(password, 8);

    await this.usersRepository.save(user);
  }
}
