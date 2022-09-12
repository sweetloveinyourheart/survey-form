import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { FormDTO } from './dto/create.dto';
import { Form } from './entities/form.entity';
import { FormService } from './form.service';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Get('/getAll')
  async getAllForm(): Promise<Form[]> {
    return await this.formService.getForms()
  }

  @Get('/getById/:id')
  async getFormById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Form> {
    return await this.formService.getFormById(id)
  }

  @Get('/getByCode/:code')
  async getFormByCode(
    @Param('code', ParseIntPipe) code: string
  ): Promise<Form> {
    return await this.formService.getFormByCode(code)
  }

  @Post('/create')
  async createNewForm(@Body() formData: FormDTO) {
    return await this.formService.createForm(formData)
  }

  @Put('/update')
  async updateForm(
    @Body() formData: FormDTO
  ) {
    return await this.formService.updateForm(formData)
  }

  @Delete('/delete/:id')
  async deleteForm(
    @Param('id', ParseIntPipe) id: number
  ) {
    return await this.formService.removeForm(id)
  }
  
}
