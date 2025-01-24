import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResourceService } from './resource.service'; 

@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}


  @Get(':resource')
  findResource(@Param('resource') resource: string) {
    return this.resourceService.findResource(resource);
  }

}
