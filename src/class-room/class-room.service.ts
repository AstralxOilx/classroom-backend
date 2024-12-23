import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassRoomDto } from './dto/create-class-room.dto';
import { UpdateClassRoomDto } from './dto/update-class-room.dto';
import { PrismaService } from 'prisma/prisma.service';
import { JoinClassRoomDto } from './dto/join-class-room.dto';
import { MemberClassRoomDto } from './dto/member.dto';

@Injectable()
export class ClassRoomService {
  constructor(private prisma: PrismaService) { }
  async create(createClassRoomDto: CreateClassRoomDto) {

    try {

      const user = await this.prisma.users.findUnique({
        where: {
          id: createClassRoomDto.creatorId
        }
      });

      if (user.roleId === 2) {
        const newClassroom = await this.prisma.classroom.create({
          data: {
            ...createClassRoomDto,
            colorId: createClassRoomDto.colorId ?? Math.floor(Math.random() * 18) + 1,
            subJectId: createClassRoomDto.subJectId ?? 8,
            statusId: createClassRoomDto.statusId ?? 1,
            creatorId: createClassRoomDto.creatorId
          }
        });

        const joinClassroom = await this.prisma.classroomUser.create({
          data: {
            classroomId: newClassroom.id,
            userId: createClassRoomDto.creatorId,
            roleId: 1,
            permissionId: 2
          }
        })

        let data = {
          name: newClassroom.name,
          code: newClassroom.id,
          description: newClassroom.description
        }

        return data
      } else {
        throw new NotFoundException('สามารถสร้างห้องเรียนได้เฉพาะครู!');
      }

    } catch (error) {
      throw new NotFoundException('เกิดข้อผิดพลาด!');
    }
  }

  async join(joinClassRoomDto: JoinClassRoomDto){

    const user = await this.prisma.users.findUnique({
      where:{
        id:joinClassRoomDto.userId
      }
    })

    if(!user) throw new NotFoundException('ไม่มีผู้ใช้นี้!');
    if(user.roleId === 2) throw new NotFoundException('ผู้ใช้นี้ ไม่ใช่นักเรียน!');

    const classroom = await this.prisma.classroom.findUnique({
      where:{
        id:joinClassRoomDto.code
      }
    });

    if(!classroom) throw new NotFoundException('ไม่มีห้องเรียนนี้!');

    const join = await this.prisma.classroomUser.createMany({
      data:{
        userId:joinClassRoomDto.userId,
        classroomId:joinClassRoomDto.code,
        permissionId:classroom.statusId,
        roleId:3
      }
    })

    return join
  }

  async findAllClassroom(user: string) {

    // ดึงข้อมูลของ classroom พร้อมข้อมูลที่ต้องการ
    const classroom = await this.prisma.classroomUser.findMany({
      where: {
        userId: user
      },
      include: { 
        classroom: {
          include: {
            creator: true,
            color: true,
            status: true,
            subject: true
          }
        },
        classRole: true,
        permission: true
      },
      orderBy: {
        joined_at: 'desc'
      }
    });

    // นับจำนวนผู้ใช้ที่อยู่ในแต่ละ classroom
    const data = await Promise.all(
      classroom.map(async (cls) => {
        // นับจำนวนผู้ใช้ใน classroom แต่ละห้อง
        const userCount = await this.prisma.classroomUser.count({
          where: {
            classroomId: cls.classroom.id
          }
        }); 

        return {
          id: cls.classroom.id,
          name: cls.classroom.name,
          status: cls.classroom.status.id,
          userId: cls.classroom.creator.id,
          firstNameTeacher: cls.classroom.creator.fname,
          lastNameTeacher: cls.classroom.creator.lname, 
          userCount: userCount, 
          colorId: cls.classroom.color.id,
          colorName: cls.classroom.color.name,
          subject: cls.classroom.subject.id,
          classRoleName:cls.classRole.name,
          classRoleId:cls.classRole.id,
          permissionName:cls.permission.name,
          permissionId:cls.permission.id,
        };
      })
    );
    return data

  }


  async member(memberClassRoomDto:MemberClassRoomDto){

    const classroom = await this.prisma.classroomUser.findMany({
      where:{
        classroomId:memberClassRoomDto.id,
        userId:memberClassRoomDto.userId
      }
    })

    if(classroom.length === 0) throw new NotFoundException('ไม่มีห้องเรียนนี้!');

    const member = await this.prisma.classroomUser.findMany({
      where:{
        classroomId:memberClassRoomDto.id,
      },
      include:{
        user:true,
        classRole:true,
        permission:true
      }
    });

    const data = await Promise.all(
      member.map(async (cls) => {
        return {
          id:cls.user.id,
          profileImageUrl:cls.user.profileImageUrl,
          fname:cls.user.fname,
          lname:cls.user.lname,
          classRoleId:cls.classRole.id,
          classRoleName:cls.classRole.name,
          permissionId:cls.permission.id,
          permissionName:cls.permission.name,
        };
      })
    );
    
    return data
  }
  


}
