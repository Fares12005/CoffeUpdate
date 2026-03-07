import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { TableModule } from './table/table.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { PaymentGetaway } from './common/Payment/payment.getaway';

@Module({
  imports: [ ConfigModule.forRoot({envFilePath: resolve('./config/.env.dev'), isGlobal: true }), MongooseModule.forRoot(process.env.MONGO_URI as string ,{onConnectionCreate(connection) {
    console.log('MongoDB connected');
  },}), UserModule, TableModule, ProductModule, OrderModule],
  controllers: [AppController],
  providers: [AppService , PaymentGetaway],
})
export class AppModule {}

