import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/DB/models/user.model';
import { Table } from 'src/DB/models/table.model';
import { JwtService } from '@nestjs/jwt';
import { TableStatusEnum } from 'src/common/enum/table.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(`User`) private userModel: Model<User>,
    @InjectModel(`Table`) private tableModel: Model<Table>,
    private readonly jwtService: JwtService
  ) {}
  
 async signUp(createUserDto: CreateUserDto) {
    
    const { firstName , email, password } = createUserDto;

    const userExists = await this.userModel.findOne({ email });

    if (userExists)
      throw new BadRequestException('User already exists');

    const user = await this.userModel.create({ firstName, email, password });

    return { message: 'User created successfully', user };

  }


 async login(createUserDto: CreateUserDto) {

  const { email, password } = createUserDto;

  const user = await this.userModel.findOne({ email });

  if (!user) {
    throw new BadRequestException('User not found');
  }

   if (password !== user.password) {
    throw new BadRequestException('Invalid password');
  }

  const AccessToken = this.jwtService.sign({id:user.id , email  } , { secret: process.env.TOKEN_SECRET_ACCESS, expiresIn: Number(process.env.JWT_EXPIRES_IN) });
  const RefreshToken = this.jwtService.sign({ id:user.id , email} , { secret: process.env.TOKEN_SECRET_REFRESH, expiresIn: Number(process.env.JWT_REFRESH_EXPIRES_IN) });

  return { AccessToken, RefreshToken };
 }


  async reservation(id: Types.ObjectId, userId: Types.ObjectId){

    const user = await this.userModel.findById(userId)
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const table = await this.tableModel.findByIdAndUpdate(id, { $set: { tableStatus: TableStatusEnum.RESERVED } }, { new: true });
    if (!table) {
      throw new BadRequestException('Table not found');
    }

    if( table.reservation && table.reservation.equals(userId)) {
      throw new BadRequestException('Table already reserved by this user');
    }

    table.reservation = userId;

    await table.save();

    return { message: 'Table reserved successfully', table };

  }

 async findAll() {
     const tabels = await this.tableModel.find();

    if(!tabels || tabels.length === 0) {
      throw new BadRequestException('No tables found');
    }
    return { message: 'Tables retrieved successfully', tabels };
  
  }

  async findOne(id: Types.ObjectId) {
    const user = await this.userModel.findById(id)
    return user;
  }
  
  async findOneTable(id: Types.ObjectId) {

    const tableExists = await this.tableModel.findById(id);
    if (!tableExists) {
      throw new BadRequestException('Table not found');
    }
    return tableExists;
  }

 

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
