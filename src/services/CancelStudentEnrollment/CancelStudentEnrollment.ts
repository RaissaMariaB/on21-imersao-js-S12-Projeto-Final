import { Course } from "../../model/Course"
import { InMemoryCourseRepositoryInterface } from "../../repositories/InMemoryCourse/InMemoryCourseRepositoryInterface";

export class CancelStudentEnrollment {
    private repository: InMemoryCourseRepositoryInterface;

    constructor(repository: InMemoryCourseRepositoryInterface) {
        this.repository = repository;
    }

    async execute(courseTitle: string, studentName: string): Promise<string> {
        const course = await this.repository.findCourse(courseTitle);
        const studentIndex = course.students.findIndex(student => student === studentName);

        if (studentIndex === -1) {
        throw new Error('Esse estudante não está matriculado');
        }

        const studentsRemoved = course.students.splice(studentIndex, 1);
        course.spots = course.spots + 1;

        return studentsRemoved[0];
    };
};