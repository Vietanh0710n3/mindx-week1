import { Injectable, NotFoundException } from '@nestjs/common';
import { Student } from './interfaces/student.interface';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  private students: Student[] = [];
  private idCounter = 1;

  findAll(): Student[] {
    return this.students;
  }

  findOne(id: number): Student {
    const s = this.students.find((st) => st.id === id);
    if (!s) throw new NotFoundException('Student not found');
    return s;
  }

  create(dto: CreateStudentDto): Student {
    const student = {
      id: this.idCounter++,
      ...dto,
    };
    this.students.push(student);
    return student;
  }

  update(id: number, dto: UpdateStudentDto): Student {
    const student = this.findOne(id);
    if (dto.name) student.name = dto.name;
    if (dto.age) student.age = dto.age;
    return student;
  }

  remove(id: number) {
    this.findOne(id); // kiểm tra tồn tại
    this.students = this.students.filter((s) => s.id !== id);
    return { message: 'Deleted successfully' };
  }
}
