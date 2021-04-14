import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customers';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';

/**
 * class ListUserService
 * method execute() returns a Promise<User>
 * return all Users inside of DB.
 */
export default class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = customerRepository.find();

    return customer;
  }
}
