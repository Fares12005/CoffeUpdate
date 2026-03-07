import { Prop } from "@nestjs/mongoose";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateTableDto {

    @IsNumber()
    @IsNotEmpty()
    tableNumber: number;

    @IsNumber()
    @IsNotEmpty()
    chairs: number;

    @IsNumber()
    @IsNotEmpty()
    reservation_price: number;
}
