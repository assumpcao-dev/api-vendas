import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  id: string;
}

export default class DeleteCustomerService {
  private customerRepository: CustomerRepository;
  constructor() {
    this.customerRepository = getCustomRepository(CustomerRepository);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async execute({ id }: IRequest) {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found..');
    }
    await this.customerRepository.remove(customer);
  }
}
