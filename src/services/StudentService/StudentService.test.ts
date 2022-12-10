import { jest, describe, expect, test, beforeEach } from '@jest/globals';
import { Student } from '../../model/Student';
import { StudentService } from './StudentSevice';


describe('Create new student', () => {
    let studentService: StudentService;

  beforeEach(() => {
    studentService = new StudentService();
  })


 test('Should be a instance of Student', async () => {
    const newStudent = await studentService.create('Alice', '009009009009', 'alice@alice.com');

    expect(newStudent).toBeInstanceOf(Student);
    expect(newStudent.name).toBe('Alice');
 })

 test('Shold not be able to create a new student with empty name, cpf or email', () => {
      
 })

})