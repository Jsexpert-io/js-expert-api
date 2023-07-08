import { Module } from '@nestjs/common';
import { ConceptcardService } from './conceptcard.service';
import { ConceptcardController } from './conceptcard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConceptCardSchema } from './entities/conceptcard.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'aibitsConceptCard', schema:ConceptCardSchema }]),
  ],
  controllers: [ConceptcardController],
  providers: [ConceptcardService]
})
export class ConceptcardModule {}
