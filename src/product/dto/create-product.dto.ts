import { IsString, IsNumber, IsNotEmpty, MinLength, MaxLength } from "class-validator";

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(20)
    name: string;
    
    @IsNumber()
    price?: number;
        
    @IsString()
    @MaxLength(100)
    @MinLength(20)
    description?: string;
    
    @IsString()
    productType?: string;
    
}
