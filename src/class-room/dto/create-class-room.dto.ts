import { IsNotEmpty, IsString,  Length,  IsNumber, IsOptional } from "class-validator";

export class CreateClassRoomDto {
    
    @IsNotEmpty()
    @IsString() 
    public creatorId: string

    @IsNotEmpty()
    @IsString()
    @Length(1,30,{message:'ชื่อต้องมีความยาวไม่เกิน 30 ตัวอักษร และไม่เป็นค่าว่าง'})
    public name: string

    @IsString() 
    @IsOptional()
    public description: string
    
    @IsNumber() 
    @IsOptional()
    public subJectId: number
    
    @IsNumber() 
    @IsOptional()
    public colorId: number
    
    @IsNumber() 
    @IsOptional()
    public statusId: number


}

export class JoinClassRoomDto {
    
    @IsNotEmpty()
    @IsString() 
    public creatorId: string

    @IsNotEmpty()
    @IsString()
    @Length(1,30,{message:'ชื่อต้องมีความยาวไม่เกิน 30 ตัวอักษร และไม่เป็นค่าว่าง'})
    public name: string

    @IsString() 
    @IsOptional()
    public description: string
    
    @IsNumber() 
    @IsOptional()
    public subJectId: number
    
    @IsNumber() 
    @IsOptional()
    public colorId: number
    
    @IsNumber() 
    @IsOptional()
    public statusId: number


}

