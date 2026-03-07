import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { TableModel } from 'src/DB/models/table.model';
import { UserModel } from 'src/DB/models/user.model';
import { PaymentGetaway } from 'src/common/Payment/payment.getaway';

@Module({
  imports:[TableModel , UserModel],
  controllers: [TableController],
  providers: [TableService , PaymentGetaway],
})
export class TableModule {}
