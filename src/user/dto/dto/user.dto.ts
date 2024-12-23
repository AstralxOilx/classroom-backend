import { IsNotEmpty, IsString, IsEmail, Length, Matches ,IsNumber } from "class-validator";


export class CreateUserDto{
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    public email:string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 50, { message: 'รหัสผ่านต้องมีความยาวระหว่าง 8 ถึง 50 ตัวอักษร' })
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,50}$/, {
        message: 'รหัสผ่านต้องมีตัวอักษรพิมพ์ใหญ่ อย่างน้อย 1 ตัว ตัวอักษรพิมพ์เล็ก อย่างน้อย 1 ตัว ตัวเลข อย่างน้อย 1 ตัว และอักขระพิเศษ (เช่น !, @, #, $) อย่างน้อย 1 ตัว',
    })
    public password: string;

    @IsNotEmpty()
    @IsString()
    @Length(1,50,{message:'ชื่อต้องมีความยาวไม่เกิน 50 ตัวอักษร'})
    public fname:string

    @IsNotEmpty()
    @IsString()
    @Length(1,50,{message:'นามสกุลต้องมีความยาวไม่เกิน 50 ตัวอักษร'})
    public lname:string

    @IsNotEmpty()
    @IsNumber()
    public roleId:number
  

    @IsNotEmpty()
    @IsString()
    @Length(1,50,{message:'รหัสประจำตัว ต้องมีความยาวไม่เกิน 50 ตัวอักษร'})
    public identification:string

}