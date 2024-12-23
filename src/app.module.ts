import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from 'prisma/prisma.service';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ResourceModule } from './resource/resource.module';
import { ClassRoomModule } from './class-room/class-room.module';

@Module({
  imports: [UserModule, AuthModule, ResourceModule, ClassRoomModule],
  providers: [PrismaService, AppService],
  controllers: [AppController]
})
export class AppModule { }
