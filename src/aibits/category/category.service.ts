import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryDocument } from './entities/category.entity';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('aibitsCategory')
    private aibitsCategoryRepository: Model<CategoryDocument>,
  ) { }
  create(createCategoryDto: CreateCategoryDto) {
   return this.aibitsCategoryRepository.create({...createCategoryDto,slug:createCategoryDto.
    name.toLowerCase().replace(/ /g,'-')})
  }

  findAll() {
    return this.aibitsCategoryRepository.find();
  }

  findOneBySlug(slug: string) {
    return this.aibitsCategoryRepository.findOne({slug});
  }
   
  findOne(id: string) {
    return this.aibitsCategoryRepository.findOne({_id:id});
  }

  update(id: any, updateCategoryDto: UpdateCategoryDto) {
    return this.aibitsCategoryRepository.updateOne({_id:id},{
      name:updateCategoryDto.name,
      description:updateCategoryDto.description,
      image:updateCategoryDto.image,
    });
  }

  remove(id: any) {
    return this.aibitsCategoryRepository.deleteOne({_id:id});
  }
}
