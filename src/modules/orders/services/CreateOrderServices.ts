import CustomerRepository from '@modules/customers/typeorm/repositories/CustomerRepository';
import { ProductsRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}
interface IRequest {
  customer_id: string;
  products: IProduct[];
}
class CreateOrderService {
  private ordersRepository: OrdersRepository;
  private customerRepository: CustomerRepository;
  private productsRepository: ProductsRepository;
  constructor() {
    this.ordersRepository = getCustomRepository(OrdersRepository);
    this.customerRepository = getCustomRepository(CustomerRepository);
    this.productsRepository = getCustomRepository(ProductsRepository);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async execute({ customer_id, products }: IRequest) {
    const customerExists = await this.customerRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError(`Could not find any customer: ${customer_id}`);
    }
    const existsProducts = await this.productsRepository.findAllByIds(products);
    if (!existsProducts.length) {
      throw new AppError('Couldnt find any products with the given ids.');
    }
    const existsProductsIds = existsProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );
    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}`,
      );
    }
    const quantityAvailable = products.filter(
      product =>
        existsProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );
    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity}
        is not available for ${quantityAvailable[0].id}`,
      );
    }
    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));
    const order = await this.ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });
    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));
    await this.productsRepository.save(updatedProductQuantity);
    return order;
  }
}

export default CreateOrderService;
