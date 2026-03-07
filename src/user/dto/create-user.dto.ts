import { IsNotEmpty, IsString, Max, Min, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @Min(2)
    @Max(50)
    firstName: string;

    
    // @IsString()
    // @IsNotEmpty()
    // @Min(2)
    // @Max(50)
    // lastName: string;

    
    @IsString()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    @Min(3)
    @Max(8)
    password: string;
}
