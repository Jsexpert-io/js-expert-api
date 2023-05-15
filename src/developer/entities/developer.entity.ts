import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Skill } from 'src/skills/entities/skill.entity';
@Schema({ timestamps: true })
export class Developer {

  @Prop()
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
  links: string[];

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
  @Prop({ type: mongoose.Schema.Types.Mixed })

  @Prop({
    ref: 'skill',
    type: [mongoose.Schema.Types.ObjectId],
  })
  skills: Skill[];
  coverPicture?: any;
}


export type DeveloperDocument = Developer & Document;



export const DeveloperSchema = SchemaFactory.createForClass(Developer);