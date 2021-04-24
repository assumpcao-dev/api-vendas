import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomerRepository';

/**
 * class ListUserService
 * method execute() returns a Promise<User>
 * return all Users inside of DB.
 */
export default class ListCustomerService {
  private customersRepository: CustomersRepository;

  constructor() {
    this.customersRepository = getCustomRepository(CustomersRepository);
  }
  public async execute(): Promise<Customer[]> {
    const customer = this.customersRepository.find();

    return customer;
  }
}
