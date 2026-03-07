import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Types } from 'mongoose';

@Controller('api/table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post(`create-table`)
  create( @Body() createTableDto: CreateTableDto) {
    return this.tableService.create( createTableDto );
  }

  @Post(`payment-table/:tableId`)
  paymentTable(@Param('tableId') tableId: Types.ObjectId) {
    return this.tableService.paymentTable( tableId );
  }

  @Get(`success`)
  getSuccessBadge() {
    return this.tableService.getSuccessBadge();
  }

  @Get(`All-tables`)
  findAll() {
    return this.tableService.findAll();
  }

   @Get(`Get-reservation-table`)
  getReservationTables() {
    return this.tableService.getReservationTables();
  }

  @Get('Get-table/:id')
  findOne(@Param('id') id: Types.ObjectId) {
    return this.tableService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    return this.tableService.update(+id, updateTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tableService.remove(+id);
  }
}
