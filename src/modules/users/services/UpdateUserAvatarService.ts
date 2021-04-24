import path from 'path';
import uploadConfig from '@config/uploads';
import fs from 'fs';

import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}
/**
 * Clas UpdatedUserAvatarService
 * method execute() findById a user and insert a avatar png
 * if a png file already exists. then overwrite the file,
 * save it into the DB and then save in DB.
 */
export default class UpdateUserAvatarService {
  private usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async execute({ user_id, avatarFileName }: IRequest) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFileName;

    await this.usersRepository.save(user);

    return user;
  }
}
