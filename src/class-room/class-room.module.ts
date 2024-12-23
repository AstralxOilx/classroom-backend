import { Module } from '@nestjs/common';
import { ClassRoomService } from './class-room.service';
import { ClassRoomController } from './class-room.controller';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ClassRoomController],
  providers: [ClassRoomService,PrismaService,JwtService],
})
export class ClassRoomModule {}
