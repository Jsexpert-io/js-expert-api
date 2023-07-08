import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class SubCategory {

    @Prop({
    })
    name: string;

    @Prop({
        ref: 'aibitsCategory',
    })
    category: string;


    @Prop({
    })
    description: string;

    @Prop({
    })
    slug: string;

    @Prop({
    })
    image: string;

   

}

export type SubCategoryDocument = SubCategory & Document;



export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
