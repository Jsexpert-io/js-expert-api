import { PartialType } from '@nestjs/mapped-types';
import { CreateUserCertificationDto } from './create-usercertification.dto';

export class UpdateUserCertificationDto extends PartialType(CreateUserCertificationDto) {}
