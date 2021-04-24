import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
}
export default class DeleteProductService {
  private productsRepository: ProductsRepository;
  constructor() {
    this.productsRepository = getCustomRepository(ProductsRepository);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async execute({ id }: IRequest) {
    const product = await this.productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found..');
    }
    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await this.productsRepository.remove(product);
  }
}
