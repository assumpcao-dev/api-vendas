import { EntityRepository, Repository } from "typeorm";
import Customer from "../entities/Customers";


/**
 * EntityRepository its a customRepository
 * Class UsersRepository have methods to search Users by:
 * Name, Id , Email.
 */
@EntityRepository(Customer)
class CustomerRepository extends Repository<Customer> {
  public async findByName(name: string): Promise<Customer | undefined> {
      const customer = await this.findOne({
        where: {
          name,
        }
      })
      return customer
  }
  public async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.findOne({
      where: {
        id,
      }
    })
    return customer
  }
  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.findOne({
      where: {
        email,
      }
    })

    return customer
  }

}

export default CustomerRepository
