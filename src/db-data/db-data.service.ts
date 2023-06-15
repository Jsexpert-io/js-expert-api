import { Injectable } from '@nestjs/common';
import { CreateDbDatumDto } from './dto/create-db-datum.dto';
import { UpdateDbDatumDto } from './dto/update-db-datum.dto';

@Injectable()
export class DbDataService {
  create(createDbDatumDto: CreateDbDatumDto) {
    return 'This action adds a new dbDatum';
  }

  findAll() {
    return `This action returns all dbData`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dbDatum`;
  }

  update(id: number, updateDbDatumDto: UpdateDbDatumDto) {
    return `This action updates a #${id} dbDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} dbDatum`;
  }
}
