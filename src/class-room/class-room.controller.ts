import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ClassRoomService } from './class-room.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateClassRoomDto } from './dto/create-class-room.dto';
import { UpdateClassRoomDto } from './dto/update-class-room.dto';
import { JoinClassRoomDto } from './dto/join-class-room.dto';
import { MemberClassRoomDto } from './dto/member.dto';

@Controller('class-room')
export class ClassRoomController {
  constructor(private readonly classRoomService: ClassRoomService) {}
  // @UseGuards(JwtGuard)
  @Post('create')
  create(@Body() createClassRoomDto: CreateClassRoomDto) {
    return this.classRoomService.create(createClassRoomDto);
  }
  // @UseGuards(JwtGuard)
  @Post('join')
  join(@Body() joinClassRoomDto: JoinClassRoomDto) {
    return this.classRoomService.join(joinClassRoomDto);
  }
  // @UseGuards(JwtGuard)
  @Get(':user')
  findAllClassroom(@Param('user') user : string ){
    return this.classRoomService.findAllClassroom(user)
  }
  
  @Post("member")
  member(@Body() memberClassRoomDto:MemberClassRoomDto){
    return this.classRoomService.member(memberClassRoomDto);
  }

}
