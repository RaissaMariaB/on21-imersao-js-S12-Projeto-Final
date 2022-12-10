import { Course } from "../../model/Course"
import { InMemoryCourseRepository } from "../../repositories/InMemoryCourse/InMemoryCourseRepository";

export class CourseService {
    repository = new InMemoryCourseRepository();

    async create(title: string,
        description: string,
        spots: number,
        startsAt: Date,
        endsAt: Date, 
        teacher: string): Promise<Course> {
          
          if (endsAt <= startsAt) {
            throw new Error("Data de término inválida");              
          }
          
          if (startsAt < new Date()) {
            throw new Error("Data de início inválida");              
          }
          
          if (spots < 5 || spots > 20  ) {
            throw new Error("O Intervalo quantitativo de vagas precisa ser entre 5 e 20");  
          }
          
          const course = new Course(title,
              description,
              spots,
              startsAt,
              endsAt, 
              teacher);

          const createCourseResponse = this.repository.save(course)

          return createCourseResponse;
    };

    async delete(title: string) {
        const deleteCourseResponse = this.repository.delete(title)

        return deleteCourseResponse
    };    

    async enrollStudent(courseTitle: string, studentName: string): Promise<Course> {
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

    async cancelStudentEnrollment(courseTitle: string, studentName: string): Promise<string> {
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