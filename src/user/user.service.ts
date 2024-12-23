import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/dto/user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) { }

    async create(dto: CreateUserDto) {
        const user = await this.prisma.users.findUnique({
            where: {
                email: dto.email,
            }
        });


        if (user) throw new ConflictException('อีเมลนี้มีอยู่ในระบบแล้ว');

        const newUser = await this.prisma.users.create({
            data: {
                ...dto,
                identification: dto.identification.replace(/[\s\W-]+/g, '').toUpperCase(),
                fname: dto.fname.replace(/\s+/g, '').toLowerCase(),
                lname: dto.lname.replace(/\s+/g, '').toLowerCase(),
                email: dto.email.replace(/\s+/g, ''),
                password: await hash(dto.password, 10)
            }
        });

        const { password, ...result } = newUser;
        return result;
    }


    async findByEmail(email: string) {
        return await this.prisma.users.findUnique({
            where: {
                email: email,
            },
            include: {
                role: true, 
            },
        });
    }


    async findById(id: string) {
        return await this.prisma.users.findUnique({
            where: {
                id: id,
            },
        });
    }

}
