import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

import RedisCache from '@shared/cache/RedisCache';

export default class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);

    const redisCache = new RedisCache();

    const products = await productsRepository.find();

    await redisCache.save('teste', 'teste');

    if (!products) {
      throw new AppError('Cannot found product with this name.');
    }
    return products;
  }
}
