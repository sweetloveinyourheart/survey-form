import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ContestService } from './contest.service';
import { CreateContestDTO } from './dto/create.dto';
import { Contest } from './entities/contest.entity';

@Controller('contest')
export class ContestController {
  constructor(private readonly contestService: ContestService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/get')
  async getContests(
    @Req() req
  ): Promise<Contest[]> {
    return this.contestService.getContestList(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/start/:code')
  async startContest(
    @Req() req,
    @Param('code') code: string
  ): Promise<Contest> {
    return this.contestService.startContest(req.user, code)
  }

  @Post('/create')
  async createContest(
    @Body() contest: CreateContestDTO
  ): Promise<Contest> {
    return this.contestService.createContest(contest)
  }

}
