import { PartialType } from '@nestjs/mapped-types';
import { AuthDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(AuthDto) {}
