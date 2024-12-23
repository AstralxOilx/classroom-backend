import { IsNotEmpty, IsString,  Length,  IsNumber, IsOptional } from "class-validator";



export class JoinClassRoomDto {
    
    @IsNotEmpty()
    @IsString() 
    public userId: string

    @IsNotEmpty()
    @IsString()
    public code: string


}

