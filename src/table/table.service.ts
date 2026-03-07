import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Table } from 'src/DB/models/table.model';
import { Model, Types } from 'mongoose';
import { TableStatusEnum } from 'src/common/enum/table.enum';
import { PaymentGetaway } from 'src/common/Payment/payment.getaway';

@Injectable()
export class TableService {

  constructor(
    @InjectModel(`Table`) private tableModel: Model<Table>,
    private readonly paymentGetaway: PaymentGetaway
  ){}

  async create(createTableDto: CreateTableDto) {

    const { tableNumber, chairs , reservation_price } = createTableDto;

    const existingTable = await this.tableModel.findOne({ tableNumber });
    if (existingTable) {
      throw new BadRequestException('Table number already exists');
    }

    const table = await this.tableModel.create({
      tableNumber,
      chairs,
      reservation_price
    });
    
    return {message: 'Table created successfully',table};
  }

  async paymentTable(tableId: Types.ObjectId){

    const table = await this.tableModel.findById(tableId);
    if (!table) {
      throw new BadRequestException('Table not found');
    }

    const paymentTable = await this.paymentGetaway.createCheckoutSession(table.reservation_price, table.tableNumber, table._id);

    table.tableStatus = TableStatusEnum.RESERVED;
    await table.save();
    
    return paymentTable.url;
    
  }

  async getSuccessBadge(){
    return {message: 'Success badge retrieved successfully'};
  }


 async findAll() {

    const tabels = await this.tableModel.find();

    if(!tabels || tabels.length === 0) {
      throw new BadRequestException('No tables found');
    }
    return { message: 'Tables retrieved successfully', tabels };
  }

   async getReservationTables(){
      const reservedTable = await this.tableModel.find({ tableStatus: TableStatusEnum.RESERVED });
      return reservedTable;
    }

 async findOne(id: Types.ObjectId) {

    const tableExists = await this.tableModel.findById(id);
    if (!tableExists) {
      throw new BadRequestException('Table not found');
    }
    return tableExists;
  }

  update(id: number, updateTableDto: UpdateTableDto) {
    return `This action updates a #${id} table`;
  }

  remove(id: number) {
    return `This action removes a #${id} table`;
  }
}
