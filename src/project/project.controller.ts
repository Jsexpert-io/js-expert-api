import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectService } from './project.service';


// "clientId": "0e7ef1ae-e832-456f-8c0e-6f005c01ffba",
//         "clientSecret": "78d695557b1e5abb1ab1c6af3c06da534c454836e0ab47b2af320992faebe1a7",
@Controller('project')
@ApiTags('project')

@UseGuards(AuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Post()
  create(@Req() req, @Body() createProjectDto: CreateProjectDto) {

    return this.projectService.create(createProjectDto, req.user._id);
  }


  @Get('findMyProjects')
  findMyProjects(@Req() req) {
    const { user } = req

    return this.projectService.findAllByUser(user._id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
