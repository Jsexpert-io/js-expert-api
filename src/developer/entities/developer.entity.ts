import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Skill } from 'src/skills/entities/skill.entity';
@Schema({ timestamps: true })
export class Developer {

  @Prop({
    type: String,
    unique: true,
})
  id: string;

  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  emailToken: string;

  // json object

  @Prop()
  isEmailVerified: boolean;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  profilePicture: any;


  @Prop({ type: mongoose.Schema.Types.Mixed })
  links: any;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  certificates: any[];

  @Prop({ type: mongoose.Schema.Types.Mixed })
  projects: any[];

  @Prop({ type: mongoose.Schema.Types.Mixed })
  resume: any;

  @Prop()
  username?: string;
  @Prop()
  bio?: string;


  @Prop({
    ref: 'skill',
    type: [String],
  })
  skills: string[];

  @Prop({ type: mongoose.Schema.Types.Mixed })
  coverPicture?: any;
}


export type DeveloperDocument = Developer & Document;



export const DeveloperSchema = SchemaFactory.createForClass(Developer);