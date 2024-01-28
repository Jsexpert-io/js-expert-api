import { IsString } from 'class-validator';

export class CreateDeveloperDto {
    @IsString()
    email: string;

    @IsString()
    password: string;

    isEmailVerified?: boolean = false;

    @IsString()
    name?: string;

    profilePicture?: any;

    username?: string;
    bio?: string;
    coverPicture?: any;
}