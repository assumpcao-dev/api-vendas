import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  user_id: string;
}

export default class ShowProductService {
  private usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async execute({ user_id }: IRequest) {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found..');
    }

    return user;
  }
}
