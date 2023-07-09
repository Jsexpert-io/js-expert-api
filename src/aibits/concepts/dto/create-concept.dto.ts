export class CreateConceptDto {
    title : string;
    description : string;
    image : string;
    subcategory : string;
    category: string;
    links : {
        youtube? : string;
        wikipedia? : string;
        blog? : string;
        other? : string;
        medium? : string;
    };
}
