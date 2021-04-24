import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

/**
 * class ListUserService
 * method execute() returns a Promise<User>
 * return all Users inside of DB.
 */
export default class ListUserService {
  private usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }
  public async execute(): Promise<User[]> {
    const users = this.usersRepository.find();
    return users;
  }
}
