import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { createHash } from 'crypto';
import { SECRET_KEY, createInputHash, sendEmail } from 'src/Utils/EmailService';
import { v4 } from 'uuid';
import { decode, sign, verify } from 'jsonwebtoken';



@Injectable({})
export class UserService {
  async verify(id: string, uniqueKey: string) {
    const user = await this.userRepository.findOne({ _id: id, uniqueKey });
    if (!user) {
      throw new Error('Invalid user');
    }
    if (user.isEmailVerified) {
      throw new Error('Email already verified');
    }
    user.isEmailVerified = true;
    await user.save();
    return {
      message: 'Email verified successfully',
    };
  }
  constructor(
    @InjectModel('user')
    private userRepository: Model<UserDocument>,
  ) { }
  async register(createUserDto: AuthDto) {
    // check if user exists
    const user = await this.userRepository.findOne({ email: createUserDto.email })
    if (user) {
      throw new Error('User already exists');
    }
    // create user



    const uniqueHash = v4();
    const newUser = await this.userRepository.
      create({
        ...createUserDto,
        password: createInputHash(createUserDto.password),
        uniqueKey: uniqueHash, isEmailVerified: false, isActive: true
      });
    await sendEmail(createUserDto.email, 'Verify your email', `
    <h1>Verify your email</h1>
    <p>Click <a href="https://api.jsexpert.io/user/verify/${newUser._id}-${uniqueHash}">here</a> to verify your email</p>
    `);
    return {
      message: 'User created successfully',

    };
  }
  async login(createUserDto: AuthDto) {
    const user = await this.userRepository.findOne({
      email: createUserDto.email,
      password: createInputHash(createUserDto.password),
      isEmailVerified: true,
      isActive: true
    });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const token = sign({
      id: user._id,
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
      console.log('res',res);
      
      if (!res) {
        throw new UnauthorizedException('Invalid token')
      }
    } catch (error) {
      console.log('error error',error);
      throw error
    }
   
    const payload: any = decode(token)
    const user = await this.userRepository.findOne({ _id: payload.id })
    if (user) {
      return user
    }
    throw new UnauthorizedException('Invalid token')
  }


}
