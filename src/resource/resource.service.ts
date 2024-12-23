import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ResourceService {
  constructor(private prisma: PrismaService) { }

  findResource(resource: string) {
    let data;
    switch (resource) {
      case "userRole":
        data = this.prisma.userRole.findMany();
        break;
      case "accoutStatus":
        data = this.prisma.accoutStatus.findMany();
        break;
      case "classRole":
        data = this.prisma.classRole.findMany();
        break;
      case "status":
        data = this.prisma.status.findMany();
        break;
        case "classStatus":
          data = this.prisma.classRoomStatus.findMany();
          break;
      case "permission":
        data = this.prisma.permission.findMany();
        break;
      case "colors":
        data = this.prisma.colors.findMany();
        break;
      case "subJects":
        data = this.prisma.subJects.findMany();
        break;
      case "checkInStatus":
        data = this.prisma.checkInStatus.findMany();
        break;
      default:
        throw new NotFoundException(`Resource ${resource} not found`);
    }
    return data;
  }
}
