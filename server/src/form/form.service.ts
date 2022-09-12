import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { FormDTO } from './dto/create.dto';
import { Form } from './entities/form.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FormService {
    constructor(
        @InjectRepository(Form) private formRepository: Repository<Form>
    ) { }

    public async createForm(formData: FormDTO) {
        const newForm = this.formRepository.create({
            ...formData,
            code: uuidv4()
        })
        return await this.formRepository.save(newForm)
    }

    public async getForms(): Promise<Form[]> {
        return await this.formRepository
            .createQueryBuilder('form')
            .loadRelationCountAndMap('form.questionCount', 'form.questions')
            .getMany()
    }

    public async getFormById(id: number): Promise<Form> {
        const forms = await this.formRepository.findOne({ 
            where: { id }, 
            relations: [
                'questions',
                'questions.answer',
                'questions.answer.selections'
            ] 
        })
        return forms
    }

    public async getFormByCode(code: string): Promise<Form> {
        const forms = await this.formRepository.findOne({ 
            where: { code }, 
            relations: [
                'questions',
                'questions.answer',
                'questions.answer.selections'
            ] 
        })
        return forms
    }

    public async updateForm(formData: FormDTO): Promise<any> {
        const updated = await this.formRepository.save(formData)
        return updated
    }

    public async removeForm(id: number): Promise<DeleteResult> {
        const deleted = await this.formRepository.delete({ id })
        return deleted
    }

}
