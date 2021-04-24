import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

import RedisCache from '@shared/cache/RedisCache';

export default class ListProductService {
  private productsRepository: ProductsRepository;

  constructor() {
    this.productsRepository = getCustomRepository(ProductsRepository);
  }
  public async execute(): Promise<Product[]> {
    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>(
      'api-vendas-PRODUCT_LIST',
    );
    if (!products) {
      products = await this.productsRepository.find();

      await redisCache.save('api-vendas-PRODUCT_LIST', products);
    }
    return products;
  }
}
