import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from 'src/common/Authntication/auzorization';
import { Types } from 'mongoose';

@Controller('api/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Post('received-order')
  createOrder(@Body(`products`) products: string[], @Req() req: any) {

    const userId = req.user.id;
    return this.orderService.createOrder(userId, products);
  }

  @Post('cancel-order')
  cancelOrder(@Body(`orderNumber`) orderNumber: number , @Body(`status`) status: string) {

    return this.orderService.cancelOrder(orderNumber , status);
  }

  @Post('payment-order/:orderId')
  paymentOrder(@Param(`orderId`) orderId: Types.ObjectId) {
    return this.orderService.paymentOrder(orderId);
  }

  @Post('processing-order')
  processingOrder(@Body(`orderNumber`) orderNumber: number , @Body(`status`) status: string) {

    return this.orderService.processingOrder(orderNumber , status);
  }

  @Post('completed-order')
  completedOrder(@Body(`orderNumber`) orderNumber: number , @Body(`status`) status: string) {

    return this.orderService.completedOrder(orderNumber , status);
  }

  @Get(`Get-All-order`)
  findAll() {
    return this.orderService.findReceivedOrders();
  }

  @Get('Get-Order')
  findOne(@Body(`orderNumber`) orderNumber: number) {
    return this.orderService.getOrder(orderNumber);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
