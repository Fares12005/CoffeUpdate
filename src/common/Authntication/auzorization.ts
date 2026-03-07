
import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/DB/models/user.model';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectModel(`User`) private userModel: Model<User>
) {}

 async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;

    if(!authHeader && !authHeader.startsWith('Bearer')) {
        throw new BadRequestException('Invalid authorization');
    }

    const token = authHeader.split(" ")[1];

    const payload = await this.jwtService.verify(token , {secret: process.env.TOKEN_SECRET_ACCESS});

    const user = await this.userModel.findById(payload.id);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    request.user = user;

    return true;
  }
}
