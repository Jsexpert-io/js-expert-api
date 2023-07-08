import { PartialType } from '@nestjs/swagger';
import { CreateConceptcardDto } from './create-conceptcard.dto';

export class UpdateConceptcardDto extends PartialType(CreateConceptcardDto) {}
