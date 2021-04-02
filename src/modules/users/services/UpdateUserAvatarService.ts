import path from 'path'
import uploadConfig from '@config/uploads'
import fs from 'fs'

import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface IRequest {
  user_id: string
  avatarFileName: string

}
export default class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {

    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findById(user_id)

    if(!user) {
      throw new AppError('User not found.')
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)
      if( userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }
    user.avatar = avatarFileName

    await usersRepository.save(user)

    return user
  }
}
