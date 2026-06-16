import { EmployeeService } from './employee.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(Number(id));
  }

  @Post()
  create(@Body() body: any) {
    return this.employeeService.create(body);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.employeeService.update(
      Number(id),
      body,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(
      Number(id),
    );
  }
}