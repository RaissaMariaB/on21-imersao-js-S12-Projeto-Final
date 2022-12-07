import { Course } from "../model/Course"
import { InMemoryCourseRepository } from "../repositories/in-memory/inMemoryCourseRepository";

export class CourseService {

    repository = new InMemoryCourseRepository();

    async create(title: string,
        description: string,
        spots: number,
        startsAt: Date,
        endsAt: Date, 
        teacher: string): Promise<Course> {

        const course = new Course(title,
            description,
            spots,
            startsAt,
            endsAt, 
            teacher);
        
        const createCourseResponse = this.repository.create(course)
        .then( (x) => {
            console.log(`Curso salvo com Sucesso `);
            return x;
          })
          .catch( (error) => {
            console.log(error);   
            throw error;       
          });

        return createCourseResponse;
    };
};