import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import CustomerRepository from "../typeorm/repositories/CustomerRepository";



interface IRequest {
  id: string;
}

export default class DeleteCustomerService {
  public async delete({ id}: IRequest): Promise<void> {

    const customerRepository = getCustomRepository(CustomerRepository)

    const customer = await customerRepository.findById(id)

    if(!customer) {
      throw new AppError('Customer not found..')
    }
    await customerRepository.delete(customer)
  }

}
