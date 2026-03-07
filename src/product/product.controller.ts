import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Types } from 'mongoose';
import { AuthGuard } from 'src/common/Authntication/auzorization';

@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post(`create-product`)
  createDrink(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  // @UseGuards(AuthGuard)
  // @Post(`reserved-product/:productId`)
  // userReserved(@Body() createProductDto: CreateProductDto , @Req() req: any, @Param('productId') productId: Types.ObjectId) {
  //   const userId = req.user._id;
  //   return this.productService.userReserved(createProductDto, userId, productId);
  // }


  @UseGuards(AuthGuard)
  @Get(`get-All-products`)
  findAll(@Req() req: any) {
    const userId = req.user._id;

    return this.productService.findAll(userId);
  }

  @UseGuards(AuthGuard)
  @Get('get-product/:productid')
  findOne(@Param('productid') productid: Types.ObjectId , @Req() req: any) {

    const userId = req.user._id;
    return this.productService.findOne(productid , userId);
  }

  @Patch('update-product/:productId')
  update(@Param('productId') productId: Types.ObjectId, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(productId, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
