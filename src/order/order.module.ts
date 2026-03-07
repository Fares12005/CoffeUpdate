import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ProductModel } from 'src/DB/models/product.model';
import { UserModel } from 'src/DB/models/user.model';
import { OrderModel } from 'src/DB/models/order.model';
import { JwtService } from '@nestjs/jwt';
import { PaymentGetaway } from 'src/common/Payment/payment.getaway';

@Module({
  imports:[ProductModel , UserModel , OrderModel],
  controllers: [OrderController],
  providers: [OrderService , JwtService , PaymentGetaway],
})
export class OrderModule {}
