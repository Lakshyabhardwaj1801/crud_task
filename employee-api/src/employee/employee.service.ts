import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.employee.findMany();
  }
  async findOne(id: number) {
  return this.prisma.employee.findUnique({
    where: { id },
  });
}

  async create(data: {
    name: string;
    email: string;
    department: string;
  }) {
    return this.prisma.employee.create({
      data,
    });
  }

  async update(
  id: number,
  data: {
    name?: string;
    email?: string;
    department?: string;
  },
) {
  return this.prisma.employee.update({
    where: { id },
    data,
  });
}
async remove(id: number) {
  return this.prisma.employee.delete({
    where: { id },
  });
}
}
