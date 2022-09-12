import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './entities/record.entity';
import { RecordItem } from './entities/record-item.entity';
import { RecordSelectionItem } from './entities/selection-item';

@Module({
  imports: [
    TypeOrmModule.forFeature([Record, RecordItem, RecordSelectionItem])
  ],
  controllers: [RecordController],
  providers: [RecordService]
})
export class RecordModule {}
