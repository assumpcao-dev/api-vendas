import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";

import Customer from "../typeorm/entities/Customers";
import CustomerRepository from "../typeorm/repositories/CustomerRepository";

/**
 * Class CreateSessionsService its create a session to allow only authenticated
 *  users view content.
 * #method execute() validate if userExists, validate password is the same in hashedDB.
 */
interface IRequest {
  email: string
  name: string
}

export default class CreateCustomerService {
  public async execute({name, email}: IRequest): Promise<Customer> {

    const customersRepository = getCustomRepository(CustomerRepository)
    const emailExists = await customersRepository.findByEmail(email)
    if(emailExists) {
      throw new AppError('Email Address already used.', 401)
    }
    const customer = customersRepository.create({
      name,
      email
    })
    await customersRepository.save(customer)

    return customer
  }
}

