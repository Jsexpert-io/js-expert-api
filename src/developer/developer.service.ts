import { Injectable } from '@nestjs/common';

import { removeImages } from 'src/Utils/ImageService';

import { prisma } from 'src/Utils/DbService';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';

@Injectable()
export class DeveloperService {
  getusername() {

    return prisma.developer.findMany({
      where: {
        username: {
          not: null
        },
      },
      select: {
        username: true
      }
    })
  }
  verifyUserName(username: string) {
    return prisma.developer.count({
      where: {
        username
      }
    }).then(res => {
      if (res > 0) {
        return false
      }
      return true
    })
  }

  create(createDeveloperInput: CreateDeveloperDto) {
    return prisma.developer.create({
      data: {
        ...createDeveloperInput,

        username: createDeveloperInput.email.split('@')[0],
      }
    })

  }

  findAll() {
    return prisma.developer.findMany({})
  }

  findOne(id: string) {
    return prisma.developer.findUnique({
      where: {
        id
      }
    })
  }
  checkUserName(username: string) {
    return prisma.developer.count({
      where: {
        username
      }
    }).then(res => {
      if (res > 0) {
        return false
      }
      return true
    })
  }
  findByEmail(email: string) {
    return prisma.developer.findUnique({
      where: {
        email
      }
    })
  }

  findOneBy(
    filter: any,
  ) {
    return prisma.developer.findFirst({
      where: {
        ...filter
      },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        bio: true,
        profilePicture: true,
        isEmailVerified: true,
        coverPicture: true,
        createdAt: true,
        updatedAt: true,
      }

    })

  }
  getProfile(username: string) {
    return prisma.developer.findFirst({
      where: {
        username
      },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        bio: true,
        profilePicture: true,
        coverPicture: true,
        createdAt: true,
        updatedAt: true,
      }


    })

  }
  checkUserByEmail(email: string) {
    return prisma.developer.count({
      where: {
        email
      }
    }).then(res => {
      if (res > 0) {
        return true
      }
      return false
    })

  }

  async update(id: string, updateDeveloperInput: UpdateDeveloperDto) {
    if (updateDeveloperInput.username) {

      const existingUserName = await prisma.developer.count({
        where: {
          username: updateDeveloperInput.username,
          email: {
            not: updateDeveloperInput.email,
          },
        },
      }).then(res => res > 0 ? true : false)


      if (existingUserName) {
        throw new Error('Username already exists');
      }
    }
    return prisma.developer.update({
      where: {
        id
      },
      data: {
        ...updateDeveloperInput,
      }

    })
  }

  async remove(id: string) {
    const developer = await this.findOne(id);
    await removeImages([developer.profilePicture, developer.coverPicture]);
    return prisma.developer.delete({
      where: {
        id
      }
    })
  }
}