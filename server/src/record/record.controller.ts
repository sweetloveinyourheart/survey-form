import { Controller, Get, Query, Post, UseGuards, Request, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { SubmitRecordDTO } from './dto/submit-record.dto';
import { Record } from './entities/record.entity';
import { RecordService } from './record.service';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Get('/getByContestCode')
  public async getRecordByContestCode(
    @Query('code') code: string
  ): Promise<Record[]> {
    return await this.recordService.getRecordByContestCode(code)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/submit')
  public async submitRecord(
    @Request() req,
    @Body() record: SubmitRecordDTO
  ): Promise<Record>  {
    return await this.recordService.submitRecord(req.user, record)
  }
}
