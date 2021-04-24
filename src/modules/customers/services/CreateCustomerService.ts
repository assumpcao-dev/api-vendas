import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import CustomersRepository from '../typeorm/repositories/CustomerRepository';

/**
 * Class CreateSessionsService its create a session to allow only authenticated
 *  users view content.
 * #method execute() validate if userExists, validate password is the same in hashedDB.
 */
interface IRequest {
  email: string;
  name: string;
}

export default class CreateCustomerService {
  private customersRepository: CustomersRepository;
  constructor() {
    this.customersRepository = getCustomRepository(CustomersRepository);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async execute({ name, email }: IRequest) {
    const emailExists = await this.customersRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError('Email Address already used.', 401);
    }
    const customer = this.customersRepository.create({
      name,
      email,
    });
    await this.customersRepository.save(customer);

    return customer;
  }
}
