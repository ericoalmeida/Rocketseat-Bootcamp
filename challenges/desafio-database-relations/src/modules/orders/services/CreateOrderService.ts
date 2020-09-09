import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

interface IProductArray {
  product_id: string;
  price: number;
  quantity: number;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customer = await this.customersRepository.findById(customer_id);

    if (!customer) {
      throw new AppError('Customer does not exists!');
    }

    const productsIds = products.map(product => ({ id: product.id }));

    const productsFindOut = await this.productsRepository.findAllById(
      productsIds,
    );

    if (productsFindOut.length !== products.length) {
      throw new AppError('Some product does not exists');
    }

    const updatedProduct: IProductArray[] = [];

    let limitStock = true;
    let productTitle = '';
    products.forEach(product => {
      productsFindOut.forEach(productFindOut => {
        if (product.id === productFindOut.id) {
          if (product.quantity > productFindOut.quantity) {
            limitStock = false;
            productTitle = productFindOut.name;
          }

          updatedProduct.push({
            product_id: product.id,
            price: productFindOut.price,
            quantity: product.quantity,
          });

          productFindOut.quantity -= product.quantity;
        }
      });
    });

    if (!limitStock) {
      throw new AppError(`Product ${productTitle} without stock available`);
    }

    await this.productsRepository.updateQuantity(productsFindOut);

    const order = await this.ordersRepository.create({
      customer,
      products: updatedProduct,
    });

    return order;
  }
}

export default CreateProductService;
