import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

/**
 * Class CreateProductService
 *
 */
interface IRequest {
  name: string;
  price: number;
  quantity: number;
}
class CreateProductService {
  private productsRepository: ProductsRepository;
  constructor() {
    this.productsRepository = getCustomRepository(ProductsRepository);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async execute({ name, price, quantity }: IRequest) {
    const redisCache = new RedisCache();

    const productExists = await this.productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }
    const product = this.productsRepository.create({
      name,
      price,
      quantity,
    });

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await this.productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
