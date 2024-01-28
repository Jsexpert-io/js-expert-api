import { Injectable } from '@nestjs/common';
import { prisma } from 'src/Utils/DbService';
import { createInputHash } from 'src/Utils/EmailService';
import { v4 } from 'uuid';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
@Injectable()
export class ProjectService {
  findByClientId(clientId: any) {
    return prisma.project.findUnique({
      where: {
        clientId
      }
    })
  }
  createUniqueSlug(slug: string) {
    return prisma.project.count({
      where: {
        slug
      }
    }).then(res => {
      if (res > 0) {
        return this.createUniqueSlug(slug + Date.now())
      }
      return slug
    })
  }
  async create(createprojectDto: CreateProjectDto, userId: string) {
    const slug = createprojectDto.name.split(' ').join('-').toLowerCase()
    const uniqueSlug = await this.createUniqueSlug(slug)
    return prisma.project.create({
      data: {
        ...createprojectDto,
        isActive: true,
        slug: uniqueSlug,
        description: createprojectDto.description,
        developer: {
          connect: {
            id: userId
          }
        },
        clientSecret: createInputHash(createprojectDto.name + userId + v4()),
        clientId: v4()
      }
    })

  }

  findAllByUser(userId: string) {
    return prisma.project.findMany({
      where: {
        developer: {
          id: userId
        }
      },
      select: {
        name: true,
        id: true,
        description: true,
        clientId: true,
        isActive: true
      }
    })
  }

  findOne(id: string) {
    return prisma.project.findUnique({
      where: {
        id
      }

    })
  }
  findOneBySlug(slug: string) {
    return prisma.project.findUnique({
      where: {
        slug
      },
      include: {

        developer: {
          select: {
            username: true,
            name: true,
            profilePicture: true
          }
        }
      }

    })

  }

  update(id: string, updateprojectDto: UpdateProjectDto) {
    return prisma.project.update({
      where: {
        id
      },
      data: {
        ...updateprojectDto
      }

    })
  }

  async remove(id: string) {


    return prisma.project.delete({
      where: {
        id
      }
    })
  }
}
