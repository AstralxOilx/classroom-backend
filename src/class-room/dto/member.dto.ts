import { IsNotEmpty, IsString,  Length,  IsNumber, IsOptional } from "class-validator";



export class MemberClassRoomDto {
    
    @IsNotEmpty()
    @IsString() 
    public userId: string

    @IsNotEmpty()
    @IsString()
    public id: string


}

