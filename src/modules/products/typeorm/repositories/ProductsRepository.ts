import { EntityRepository, Repository } from 'typeorm';
import Product from '../entities/Product';

/**
 * Class ProductRepository its an extension of Typeorm Repository
 * method findByName its a customRepository to find products by name.
 */
@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.findOne({
      where: {
        name,
      },
    });
    return product;
  }
}
