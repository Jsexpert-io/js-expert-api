import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

const conceptCard = {
    "hasMaths": true,
    "hasCode": true,
    "code":"",
    "title": "what is Term Frequence",
    "variables": [
        {
            "name": "n",
            "value": "number of times the word appears in a document"
        },
        {
            "name": "N",
            "value": "total number of words in the document"
        }
    ],
    "mathjax_content": "\\(\\frac{{\\text{{Number of occurrences of a term in a document}}}}{{\\text{{Total number of terms in the document}}}}\\)",
    "content": "Term frequency is the number of times a word appears in a document.\n      it is calculated for each word in the document\n      "
} 
type ConceptCardn = typeof ConceptCard;
@Schema({ timestamps: true })

export class ConceptCard {

     
        @Prop()
        title: string;
        @Prop({
            type: mongoose.Schema.Types.Mixed,
        })
        content: string;

        // permission
    


        // maths
        @Prop()
        hasMaths: boolean;
        @Prop()
        mathjax_content: string;




    
        // code
        @Prop()
        hasCode: boolean;
        @Prop()
        code: string;
      

        @Prop({
            type: mongoose.Schema.Types.Mixed,
        })
        points: any;

        @Prop({
            type: mongoose.Schema.Types.Mixed,
        })
        variables: any;

        @Prop()
        image: string;
        @Prop()
        slug: string;
        @Prop({
            ref: 'aibitsConcept',
        })
        concept: string;
        @Prop({
            ref: 'aibitsSubcategory',
        })
        subcategory: string;
        @Prop({
            ref: 'aibitsCategory',
        })
        category: string;
        

        

   

}

export type ConceptCardDocument = ConceptCard & Document;



export const ConceptCardSchema = SchemaFactory.createForClass(ConceptCard);
