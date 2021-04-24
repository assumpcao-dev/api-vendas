import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  id: string;
}

export default class ShowCostumerService {
  private customersRepository: CustomersRepository;
  constructor() {
    this.customersRepository = getCustomRepository(CustomersRepository);
  }
  public async execute({ id }: IRequest): Promise<Customer> {
    const costumer = await this.customersRepository.findById(id);
    if (!costumer) {
      throw new AppError('Costumer not found..');
    }

    return costumer;
  }
}
