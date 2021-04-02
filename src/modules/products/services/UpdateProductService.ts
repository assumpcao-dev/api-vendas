import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest {
  name: string
  price: number
  quantity: number,
  id: string

}

export default class UpdateProductService {
  public async execute({id, name, price, quantity}: IRequest): Promise<Product> {

    const productRespository = getCustomRepository(ProductRepository)
    const product = await productRespository.findOne(id)

    if(!product) {
      throw new AppError('Cannot find this product')
    }

    const productsExists = await productRespository.findByName(name)

    if( productsExists) {
      throw new AppError('There is already one product with this name')
    }

    product.name = name
    product.price = price
    product.quantity = quantity

    await productRespository.save(product)

    return product
  }
}
