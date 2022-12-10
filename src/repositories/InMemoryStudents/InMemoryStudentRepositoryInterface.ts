import { Student } from '../../model/Student'

export interface InMemoryStudentRepositoryInterface {
    save(course: Student): Promise<Student>;
    delete(courseTitle: string): Promise<Student>;
    findStudent(courseTitle: string): Promise<Student>;
};