import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import CustomersRepository from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

export default class UpdateCustomerService {
  private customersRepository: CustomersRepository;
  constructor() {
    this.customersRepository = getCustomRepository(CustomersRepository);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async execute({ id, name, email }: IRequest) {
    const customer = await this.customersRepository.findById(id);
    if (!customer) {
      throw new AppError('Customer not found..');
    }

    const customerUpdateEmail = await this.customersRepository.findByEmail(
      email,
    );

    if (customerUpdateEmail && customerUpdateEmail.id !== customer.id) {
      throw new AppError('There is already one user with this email.');
    }

    customer.name = name;
    customer.email = email;

    await this.customersRepository.save(customer);

    return customer;
  }
}
