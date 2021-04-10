import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customers';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  id: string;
}

export default class ShowCostumerService {
  public async execute({ id }: IRequest): Promise<Customer> {
    const costumerRepository = getCustomRepository(CustomerRepository);

    const costumer = await costumerRepository.findById(id);
    if (!costumer) {
      throw new AppError('Costumer not found..');
    }

    return costumer;
  }
}
