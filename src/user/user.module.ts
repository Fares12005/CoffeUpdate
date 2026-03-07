import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserModel } from 'src/DB/models/user.model';
import { TableModel } from 'src/DB/models/table.model';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports:[ UserModel , TableModel],
  controllers: [UserController],
  providers: [UserService , JwtService],
})
export class UserModule {}
