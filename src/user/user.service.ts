import { Injectable, UnauthorizedException } from '@nestjs/common';
import { decode, sign, verify } from 'jsonwebtoken';
import { prisma } from 'src/Utils/DbService';
import { SECRET_KEY, createInputHash, sendEmail } from 'src/Utils/EmailService';
import { v4 } from 'uuid';
import { AuthDto } from './dto/create-user.dto';



@Injectable({})
export class UserService {
  async verify(id: string, uniqueKey: string) {

    const user = await prisma.user.findUnique({
      where: {
        id, uniqueKey
      }

    })
    if (!user) {
      throw new Error('Invalid user');
    }
    if (user.isEmailVerified) {
      throw new Error('Email already verified');
    }

    await prisma.user.update({
      where: {
        id
      },
      data: {
        isEmailVerified: true
      }
    })
    return {
      message: 'Email verified successfully',
    };
  }

  async register(createUserDto: AuthDto) {
    // check if user exists

    const user = await prisma.user.findUnique({ where: { email: createUserDto.email } });
    console.log(user)
    if (user) {
      throw new Error('User already exists');
    }
    // create user



    const uniqueKey = v4();
    const newUser = await prisma.user.create({
      data: {
        ...createUserDto,

        password: createInputHash(createUserDto.password),
        uniqueKey: uniqueKey, isEmailVerified: true, isActive: true
      }
    })


    await sendEmail(createUserDto.email, 'Verify your email', `
    <h1>Verify your email</h1>
    <p>Click <a href="https://api.jsexpert.io/user/verify/${newUser.id}-${uniqueKey}">here</a> to verify your email</p>
    `);
    return {
      message: 'User created successfully',

    };
  }
  async login(createUserDto: AuthDto) {
    const user = await prisma.user.findUnique({
      where: {
        email: createUserDto.email,
        password: createInputHash(createUserDto.password),
        isEmailVerified: true,
        isActive: true
      }
    })



    if (!user) {
      throw new Error('Invalid credentials');
    }

    const token = sign({
      id: user.id,
      email: user.email,


    }, SECRET_KEY, {
      expiresIn: '1d'
    })
    return {
      user, token
    }
  }
  async verifyToken(token: any) {

    try {
      const res = verify(token, SECRET_KEY)

      if (!res) {
        throw new UnauthorizedException('Invalid token')
      }
    } catch (error) {
      console.log('error error', error);
      throw error
    }

    const payload: any = decode(token)
    const user = await prisma.user.findUnique({ where: { id: payload.id } })
    if (user) {
      return user
    }
    throw new UnauthorizedException('Invalid token')
  }


}
