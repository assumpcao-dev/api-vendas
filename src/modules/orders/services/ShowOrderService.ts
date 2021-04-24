import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';

interface IRequest {
  id: string;
}
class ShowOrderService {
  private ordersRepository: OrdersRepository;
  constructor() {
    this.ordersRepository = getCustomRepository(OrdersRepository);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async execute({ id }: IRequest) {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found.');
    }
    return order;
  }
}

export default ShowOrderService;
