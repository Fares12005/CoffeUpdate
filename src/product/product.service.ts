import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from 'src/DB/models/product.model';
import { User } from 'src/DB/models/user.model';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel('Product') private productModel: Model<Product>,
    @InjectModel('User') private userModel: Model<User>,
  ){}


 async createProduct(createProductDto: CreateProductDto) {
    const {name , price , description , productType } = createProductDto;

    const productEXIST = await this.productModel.findOne({ name})
    if (productEXIST) {
      throw new BadRequestException('Product with this name already exists');
    }

    const newProduct = await this.productModel.create({name , price , description, productType})

    return {message: 'Product created successfully', product: newProduct};


  }

  // async userReserved( createProductDto: CreateProductDto , userId: Types.ObjectId , productId: Types.ObjectId ){

  //   const user = await this.userModel.findById(userId);
  //   if (!user) {
  //     throw new BadRequestException('User not found');
  //   }


  //   const product = await this.productModel.findById(productId);
  //   if(!product) {
  //     throw new BadRequestException('Product not found');
  //   }

  //   product.userReserved = [userId];
  //   await product.save();

  //   return { message: 'Product reserved successfully', product };
  // }



 async findAll(userId: Types.ObjectId) {

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const products = await this.productModel.find();
    return products;
  }

 async findOne(productid: Types.ObjectId , userId: Types.ObjectId) {

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const product = await this.productModel.findById(productid);
    if (!product) {
      throw new BadRequestException('Product not found');
    }


    
    return product;
  }

 async updateProduct(id: Types.ObjectId, updateProductDto: UpdateProductDto) {
    const { name, price, description } = updateProductDto;

    const product = await this.productModel.findByIdAndUpdate(id, { name, price, description }, { new: true });
    if (!product) {
      throw new BadRequestException('Product not found');
    }
    return product;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
