import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticatedUser } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { CreateContestDTO } from './dto/create.dto';
import { Contest } from './entities/contest.entity';

@Injectable()
export class ContestService {
    constructor(
        @InjectRepository(Contest) private contestRepository: Repository<Contest>
    ) {}

    async createContest(contest: CreateContestDTO): Promise<Contest> {
        //generate contest code
        const code = (Math.random() + 1).toString(36).substring(8);

        const newContest = await this.contestRepository.create({
            ...contest,
            code
        })
        return await this.contestRepository.save(newContest)
    }

    async getContestList(user: AuthenticatedUser): Promise<Contest[]> {
        return await this.contestRepository.find({ 
            relations: ['users', 'form'], 
            where: { users: { id: user.sub } } ,
            select: [ 'id', 'code', 'createdAt', 'form' ]
        })
    }

    async startContest(user: AuthenticatedUser, code: string): Promise<Contest> {
        return await this.contestRepository.findOne({ 
            relations: ['users', 'form', 'form.questions', 'form.questions.answer', 'form.questions.answer.selections'], 
            where: { users: { id: user.sub }, code } ,
            select: [ 'id', 'code', 'createdAt', 'form' ]
        })
    }
}
