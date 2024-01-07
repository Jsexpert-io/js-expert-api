import { ChallangeLevelType } from "../entities/challange.entity";

export class CreateChallangeDto {
    name: string;
    start_date: string;
    end_date: string;
    slug: string;
    image: any;
    description: string;
    status: string;
    prize: string;
    points: number;
    skills: string[];
    createdBy: string;
    level: ChallangeLevelType; 
    
}
