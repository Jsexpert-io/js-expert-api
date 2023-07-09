import { Module } from '@nestjs/common';
import { ConceptService } from './concepts.service';
import { ConceptsController } from './concepts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConceptSchema } from './entities/concept.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'aibitsConcept', schema:ConceptSchema }]),
  ],
  controllers: [ConceptsController],
  providers: [ConceptService],
  exports: [ConceptService]
})
export class ConceptsModule {}
