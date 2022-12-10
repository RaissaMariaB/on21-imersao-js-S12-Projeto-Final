import { describe, expect, test, beforeEach } from '@jest/globals';
import { Student } from '../../model/Student';
import { InMemoryStudentRepository } from '../../repositories/InMemoryStudents/InMemoryStudentRepository'
import { CreateStudent } from './CreateStudent';


describe('Create new student', () => {
    const studentRepository = new InMemoryStudentRepository();
    const createStudent = new CreateStudent(studentRepository);

    beforeEach(() => {
        studentRepository.resetData();
    })

    test('Should be a instance of Student', async () => {
    const newStudent = await createStudent.execute('Alice', '009009009009', 'alice@alice.com');

    expect(newStudent).toBeInstanceOf(Student);
    expect(newStudent.name).toBe('Alice');
    });
});