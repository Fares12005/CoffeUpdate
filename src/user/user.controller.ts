import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Types } from 'mongoose';
import { AuthGuard } from 'src/common/Authntication/auzorization';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(`create-user`)
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.signUp(createUserDto);
  }

  @Post(`login`)
  login(@Body() createUserDto: CreateUserDto) {
    return this.userService.login(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Post(`reservation-table/:id`)
  reservation(@Param('id') id: Types.ObjectId, @Req() request: any) {
    const userId = request.user._id;
    return this.userService.reservation(id, userId);
  }

  @Get(`All-tables`)
  findAll() {
    return this.userService.findAll();
  }

 

  @Get('getProfile/:id')
  findOne(@Param('id') id: Types.ObjectId) {
    return this.userService.findOne(id);
  }

  @Get('Get-table/:id')
  findOneTable(@Param('id') id: Types.ObjectId) {
    return this.userService.findOneTable(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
