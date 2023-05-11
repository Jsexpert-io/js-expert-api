
import { IsString } from 'class-validator';

export class CreateDeveloperDto {

  @IsString()
  email: string;

  
  @IsString()
  firstName: string;

  
  @IsString()
  lastName: string;

  
  @IsString()
  picture: string;
}
