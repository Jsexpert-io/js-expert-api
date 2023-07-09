import { Module } from '@nestjs/common';
import { ConceptcardService } from './conceptcard.service';
import { ConceptcardController } from './conceptcard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConceptCardSchema } from './entities/conceptcard.entity';
import { ConceptsModule } from '../concepts/concepts.module';

@Module({
  imports: [
    ConceptsModule,
    MongooseModule.forFeature([{ name: 'aibitsConceptCard', schema:ConceptCardSchema }]),
  ],
  controllers: [ConceptcardController],
  providers: [ConceptcardService]
})
export class ConceptcardModule {}
