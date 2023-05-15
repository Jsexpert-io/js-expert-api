
import { IsBoolean, IsString } from 'class-validator';

export class CreateDeveloperDto {

    @IsString()
    email: string;

    @IsString()
    password: string;


    isEmailVerified: boolean = false;


    @IsString()
    name?: string;

    profilePicture?: any;

    links?: string[];
    certificates?: any[];
    projects?: any[];
    resume?: any;
    username?: string;
    bio?: string;
    coverPicture?: any;
    skills?: string[];

}
