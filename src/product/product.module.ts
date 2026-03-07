import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductModel } from 'src/DB/models/product.model';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/DB/models/user.model';

@Module({
  imports:[ProductModel , UserModel],
  controllers: [ProductController],
  providers: [ProductService , JwtService],
})
export class ProductModule {}
