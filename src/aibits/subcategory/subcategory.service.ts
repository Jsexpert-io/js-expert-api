import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { SubCategoryDocument } from './entities/subcategory.entity';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectModel('aibitsSubcategory')
    private aibitsSubcategoryRepository: Model<SubCategoryDocument>,
  ) { }
  create(createSubcategoryDto: CreateSubcategoryDto) {
    return this.aibitsSubcategoryRepository.create({
      ...createSubcategoryDto, slug: createSubcategoryDto.
        name.toLowerCase().replace(/ /g, '-')
    })
  }

  findAll() {
    return this.aibitsSubcategoryRepository.find();
  }

  findOne(slug: string) {
    return this.aibitsSubcategoryRepository.findOne({ slug });
  }

  findbycategory(category: string) {
    console.log(category);
    return this.aibitsSubcategoryRepository.findOne({ category: category.toString() });
  }



  update(id: string, updateSubcategoryDto: UpdateSubcategoryDto) {
    return this.aibitsSubcategoryRepository.updateOne({ id }, {
      name: updateSubcategoryDto.name,
      description: updateSubcategoryDto.description,
      image: updateSubcategoryDto.image,
    });
  }

  remove(id: any) {
    return this.aibitsSubcategoryRepository.deleteOne({_id:id});
  }
}
