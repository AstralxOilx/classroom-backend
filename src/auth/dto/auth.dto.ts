import { IsEmail, IsNotEmpty, IsString} from "class-validator";

export class SigninDto { 

    @IsNotEmpty() 
    @IsEmail()
    @IsString()
    public email:string;

    @IsNotEmpty()
    @IsString()
    public password: string;

}