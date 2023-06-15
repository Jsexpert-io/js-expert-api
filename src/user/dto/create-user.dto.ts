import { ApiProperty } from "@nestjs/swagger";


export class AuthDto {
    email: string;
    password: string;
}
