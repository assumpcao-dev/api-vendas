import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";

/**
 * class ListUserService
 * method execute() returns a Promise<User>
 * return all Users inside of DB.
 */
export default class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository)

    const users = usersRepository.find()
    return users
  }
}
