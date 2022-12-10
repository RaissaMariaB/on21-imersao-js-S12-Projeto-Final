import { Course } from "../../model/Course"
import { InMemoryCourseRepositoryInterface } from "../../repositories/InMemoryCourse/InMemoryCourseRepositoryInterface";

export class EnrollStudent {
    private repository: InMemoryCourseRepositoryInterface;

    constructor(repository: InMemoryCourseRepositoryInterface) {
        this.repository = repository;
    }

    async execute(courseTitle: string, studentName: string): Promise<Course> {
        const course = await this.repository.findCourse(courseTitle);

        if (course.spots < 1) {
          throw new Error('Não há mais vagas no curso');
        }
  
        if (course.startsAt < new Date()) {
          throw new Error('Este curso já iniciou e novos estudantes não podem ser adicionados');
        }
  
        course.students.push(studentName);
        course.spots = course.spots - 1;
  
        return course;
    };
};