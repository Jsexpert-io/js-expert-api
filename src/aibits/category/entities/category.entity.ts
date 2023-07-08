import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Category {

    @Prop({
    })
    name: string;

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

export type CategoryDocument = Category & Document;



export const CategorySchema = SchemaFactory.createForClass(Category);
