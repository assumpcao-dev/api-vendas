import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
  id: string;
}

export default class UpdateProductService {
  private productsRepository: ProductsRepository;
  constructor() {
    this.productsRepository = getCustomRepository(ProductsRepository);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async execute({ id, name, price, quantity }: IRequest) {
    const product = await this.productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Cannot find this product');
    }

    const productsExists = await this.productsRepository.findByName(name);

    if (productsExists) {
      throw new AppError('There is already one product with this name');
    }

    const redisCache = new RedisCache();

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await this.productsRepository.save(product);

    return product;
  }
}
