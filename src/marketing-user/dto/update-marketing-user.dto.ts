import { PartialType } from '@nestjs/swagger';
import { CreateMarketingUserDto } from './create-marketing-user.dto';

export class UpdateMarketingUserDto extends PartialType(CreateMarketingUserDto) {}
