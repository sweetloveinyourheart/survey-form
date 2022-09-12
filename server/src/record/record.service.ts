import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticatedUser } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { SubmitRecordDTO } from './dto/submit-record.dto';
import { Record } from './entities/record.entity';

@Injectable()
export class RecordService {
    constructor(
        @InjectRepository(Record) private recordRepository: Repository<Record>
    ) { }

    public async submitRecord(user: AuthenticatedUser, record: SubmitRecordDTO): Promise<Record> {
        const newRecord = await this.recordRepository.create({
            ...record,
            user: {
                id: user.sub
            },
            finished: true
        })

        return await this.recordRepository.save(newRecord)
    }

    public async getRecordByContestCode(code: string): Promise<Record[]> {
        const data = await this.recordRepository.find({
            where: { contest: { code } },
            relations: ['contest', 'user']
        })
        
        return data
    }
}
