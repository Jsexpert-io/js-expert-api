import { PartialType } from '@nestjs/swagger';
import { CreateServerDatumDto } from './create-server-datum.dto';

export class UpdateServerDatumDto extends PartialType(CreateServerDatumDto) {}
