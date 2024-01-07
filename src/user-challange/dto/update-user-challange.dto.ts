import { PartialType } from '@nestjs/mapped-types';
import { CreateUserChallangeDto } from './create-user-challange.dto';

export class UpdateUserChallangeDto extends PartialType(CreateUserChallangeDto) {}
