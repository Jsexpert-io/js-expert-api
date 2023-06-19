import { Injectable } from '@nestjs/common';
import { CreateMarketingUserDto } from './dto/create-marketing-user.dto';
import { UpdateMarketingUserDto } from './dto/update-marketing-user.dto';
import { MarketingUserDocument } from './entities/marketing-user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MarketingUserService {
  constructor(
    @InjectModel('marketinguser')
    private marketingUserRepository: Model<MarketingUserDocument>,
  ) { }
  create(createMarketingUserDto: CreateMarketingUserDto) {
    return this.marketingUserRepository.create(createMarketingUserDto);
  }

  findAll() {
    return this.marketingUserRepository.find();
  }

  findOne(id: string) {
    return this.marketingUserRepository.findOne({id});
  }

  update(id: string, updateMarketingUserDto: UpdateMarketingUserDto) {
    return this.marketingUserRepository.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateMarketingUserDto,
      },
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.marketingUserRepository.findByIdAndRemove(id);
  }
}
