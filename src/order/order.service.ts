import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order } from 'src/DB/models/order.model';
import { User } from 'src/DB/models/user.model';
import { Product } from 'src/DB/models/product.model';
import { OrderStatusEnum } from 'src/common/enum/order.enum';
import { PaymentGetaway } from 'src/common/Payment/payment.getaway';

@Injectable()
export class OrderService {

  constructor(
    @InjectModel('Order') private orderModel: Model<Order>,
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Product') private productModel: Model<Product>,
    private readonly paymentGetaway: PaymentGetaway
  ) {}


  async createOrder(userId: Types.ObjectId, products: string[]) {

    const user = await this.userModel.findById(userId);
    if (!user) 
      throw new BadRequestException('User not found');

    const product = await this.productModel.find({_id: {$in: products.map(id => new Types.ObjectId(id))}});
    if (!product) {
      throw new BadRequestException('Product not found');
    }

    const orderTotal = product.reduce((total, product) => total + product.price, 0);


    const order = await this.orderModel.create({ orderUser: userId , orderProducts: products as unknown as Types.ObjectId[] , orderTotal });

    return { message: 'Order created successfully', order };


  }

 async paymentOrder(orderId: Types.ObjectId) {
    
  const order = await this.orderModel.findById(orderId);

  if(!order) throw new BadRequestException('Order not found');

  const paymentOrder = await this.paymentGetaway.createCheckoutSession(order.orderTotal , order.orderNumber ,orderId)

  if(!paymentOrder) throw new BadRequestException('Payment not found');

  order.status = OrderStatusEnum.PENDING;

  await order.save();

  return paymentOrder.url;


 };

  async cancelOrder( orderNumber: number , status: string) {

    const order = await this.orderModel.find({orderNumber})

    if(!order) throw new BadRequestException('Order not found');

    const updatedOrder = await this.orderModel.updateOne({orderNumber}, {status: OrderStatusEnum.CANCELLED})

    return updatedOrder;



   
  }

  async processingOrder(orderNumber: number , status: string){
    
    const order = await this.orderModel.find({orderNumber})

    if(!order) throw new BadRequestException('Order not found');

    const updatedOrder = await this.orderModel.updateOne({orderNumber}, {status: OrderStatusEnum.PROCESSING})

    return updatedOrder;
  }

  async completedOrder(orderNumber: number , status: string){
    
    const order = await this.orderModel.find({orderNumber})

    if(!order) throw new BadRequestException('Order not found');

    const updatedOrder = await this.orderModel.updateOne({orderNumber}, {status: OrderStatusEnum.COMPLETED})

    return updatedOrder;
  }

  async findReceivedOrders() {

    const order = await this.orderModel.find();
    return order;
  }

 async getOrder(orderNumber: number) {

    const order = await this.orderModel.findOne({ orderNumber });
    return order;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
