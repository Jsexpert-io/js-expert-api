import { PartialType } from '@nestjs/swagger';
import { CreateDbDatumDto } from './create-db-datum.dto';

export class UpdateDbDatumDto extends PartialType(CreateDbDatumDto) {}
